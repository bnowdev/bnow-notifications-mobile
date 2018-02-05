import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { List, ListItem, SearchBar, Icon } from "react-native-elements";
import SideMenu from "react-native-side-menu";
import OneSignal from "react-native-onesignal";
import { NavigationActions } from "react-navigation";

import Menu from "./Menu";

const hamburgerButton = (
  <Icon
    iconStyle={{ marginLeft: 10 }}
    name="menu"
    onPress={() => {
      this.toggleMenu();
    }}
  />
);

class NotificationListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      notifications: [],
      error: null,
      refreshing: false,
      menuIsOpen: false,
      isMounted: false
    };
  }

  toggleMenu = () => {
    console.log("BurgerPressed");
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  };

  // sets the option for the screen header - using reactNavigation options
  static navigationOptions = ({ navigation }) => ({
    title: "Received notifications",
    headerLeft: (
      <Icon
        iconStyle={{ marginLeft: 10 }}
        name="menu"
        onPress={() => {
          navigation.state.params.handleToggleMenu();
        }}
      />
    )
  });

  componentDidMount() {
    this.setParams();
    this.setState({ isMounted: true }, () => {
      this.getNotificationsAsync();
    });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
    console.log("newnotification screen will unmount");
  }

  setParams() {
    this.props.navigation.setParams({ handleToggleMenu: this.toggleMenu });
  }

  getNotificationsAsync = async () => {
    //If component did mount(to avoid double component render on start)
    if (this.state.isMounted) {
      this.setState({ loading: true });
      let _notificationsString = null;

      try {
        _notificationsString = await AsyncStorage.getItem(
          "@OneSignalNotifications:key"
        );
      } catch (error) {
        this.setState({ error, loading: false });
        console.log(error);
      }

      let _notifications = _notificationsString
        ? JSON.parse(_notificationsString)
        : [];

      console.log("notifications", _notifications);

      //if(this.state.isMounted){
      this.setState({
        notifications: _notifications,
        loading: false,
        refreshing: false
      });
      // }
    }
  };

  onNotificationPress = item => {
    console.log("item", item);

    this.props.navigation.navigate("NotificationDetails", {
      notification: item
    });
  };

  deleteNotifications = async () => {
    try {
      await AsyncStorage.removeItem("@OneSignalNotifications:key");
      this.setState({
        notifications: []
      });
    } catch (error) {
      console.log();
      Alert.alert("Error", error);
    }
  };

  deleteServiceNowId = () => {
     OneSignal.deleteTag("serviceNowId");
    this.navigateTo("Form");
    console.log("deleteTag");
  };

  onMenuItemSelected = item => {
    console.log(item);

    switch (item) {
      case "deleteSnId":
        this.deleteServiceNowId();
        break;
      case "clearNotifications":
        this.deleteNotifications();
        break;
      case "refreshNotifications":
        this.handleRefresh();
        break;
      default:
        break;
    }

    this.setState({
      menuIsOpen: false
    });
  };

  updateMenuState = isOpen => {
    this.setState({
      menuIsOpen: isOpen
    });
  };

  navigateTo = routeName => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  };

  // === ui methods for notification list ===
  handleRefresh = () => {
    console.log("refresh");

    this.setState(
      {
        refreshing: true
      },
      () => {
        this.getNotificationsAsync();
      }
    );
  };

  getKeyExtractor = (item, index) => index;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Search..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderSubtitle = subtitle => {
    let _subtitle =
      (subtitle && subtitle.length) > 30
        ? subtitle.substr(0, 30) + "..."
        : "  ";
    return subtitle;
  };
  // === ui methods for notification list end ===

  render() {
    const menu = <Menu onMenuItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.menuIsOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}> */}
            <FlatList
              initialNumToRender={5}
              data={this.state.notifications}
              renderItem={({ item }) => (
                <ListItem
                  onPress={() => {
                    this.onNotificationPress(item);
                  }}
                  title={item.title}
                  leftIcon={{ name: "error-outline" }}
                  subtitle={this.renderSubtitle(item.body)}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
              )}
              keyExtractor={this.getKeyExtractor}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
            />
          {/* </List> */}
        </View>
      </SideMenu>
    );
  }
}

export default NotificationListScreen;
