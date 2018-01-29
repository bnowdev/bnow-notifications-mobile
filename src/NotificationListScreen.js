/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Alert,
  TouchableOpacity
} from "react-native";

//ONLY FOR DEBUGGING
import OneSignal from "react-native-onesignal";
import { NavigationActions } from "react-navigation";

class NotificationListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      notifications: []
    };
  }

  componentWillMount() {
    console.log("willMount");
  }

  componentDidMount() {
    console.log("didMount");

    this.setState({
      isLoading: true
    });
    this.getSavedNotifications();

    console.log("endDidMount");
    
  }

  static navigationOptions = {
    title: "Your Notifications"
  };

  //region old getSavedNotifications
  // getSavedNotifications = async () => {
  //   this.setState({
  //     isLoading: true
  //   });

  //   console.log("getSavedNotifications");

  //   try {
  //     console.log("getSavedNotifications = > try");

  //     let _notifications = await AsyncStorage.getItem(
  //       "@OneSignalNotifications:key"
  //     );
  //     console.log(_notifications);

  //     if (_notifications) {
  //       console.log("IF ");
  //       _notifications = JSON.parse(notifications);

  //       if (Array.isArray && _notifications.length > 0) {
  //         this.setState({
  //           isLoading: false,
  //           notifications: _notifications
  //         });

  //         console.log("Notifications loaded:");
  //         console.log(_notifications);

  //         return _notifications;
  //       } else {
  //         this.setState({ isLoading: false });
  //         console.log("Notifications.length < 1 or not an array");
  //       }
  //     }

  //     console.log("No @OneSignalNotifications:key in Asyncstorage ");
  //     this.setState({ isLoading: false });
  //   } catch (error) {
  //     console.log("insideCatch");
  //     console.log(error);
  //     this.setState({
  //       isLoading: false
  //     });
  //   }

  //   console.log("end getSavedNotifications");
  //   this.setState({
  //     isLoading: false
  //   });
  // };
  //endregion

  getSavedNotifications = async () => {
    let _notificationsString = null;

    console.log("inside getSavedNotifications");
    try {
      _notificationsString = await AsyncStorage.getItem(
        "@OneSignalNotifications:key"
      );
      if (!_notificationsString) {
        console.log("no data 2");
      }
    } catch (error) {
      console.log("inside getSavedNotificationsCatch");
      console.log(error);
    }
    console.log("after try AsyncStorage.getItem");

    if (_notificationsString) {
      let _notifications = JSON.parse(_notificationsString);

      if (Array.isArray(_notifications) && _notifications.length > 0) {
        this.setState({
          notifications: _notifications
        });
      }
      Alert.alert("Got notifications(test)");
    } else {
      Alert.alert("Got no notifications(test)");
    }

    console.log("after async storage");

    this.setState({
      isLoading: false
    });

    console.log("State getSavedNotifications", this.state);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  // === ONLY FOR DEBUGGING =====
  _deleteServiceNowTagFromOnesignal = () => {
    OneSignal.deleteTag("serviceNowId");
    this._navigateTo("Form");
  };

  _deleteNotificationsFromAsyncStore = async () => {
    try {
      await AsyncStorage.deleteItem("@OneSignalNotifications:key");
      this.setState({
        notifications: []
      });
    } catch (error) {
      console.log();
      Alert.alert("Error", error);
    }
  };

  _navigateTo = routeName => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  };
  // === ONLY FOR DEBUGGING =====

  render() {
    if (this.state.isLoading) {
      console.log("Loading notification");
      return (
        <View style={styles.container}>
          <Text>Loading Notifications...</Text>
        </View>
      );
    }

    if (
      !this.state.isLoading &&
      (!this.state.notifications || this.state.notifications.length < 1)
    ) {
      console.log("No notifications 2");
      return (
        <View style={styles.container}>
          <Text style={styles.notificationTitle}>No notifications 2W! </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this._deleteServiceNowTagFromOnesignal}
          >
            <Text style={styles.buttonText}>
              Delete user tag from onesignal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this._deleteNotificationsFromAsyncStore}
          >
            <Text style={styles.buttonText}>Delete Notifications </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.notificationList}
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.notifications}
          renderItem={({ item }) => (
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationTitle}> {item.title}</Text>
              {item.body.length > 50 ? (
                <Text style={styles.notificationText}>
                  {item.body.substr(0, 50) + "..."}
                </Text>
              ) : (
                <Text style={styles.notificationText}>{item.body}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this._deleteServiceNowTagFromOnesignal}
        >
          <Text style={styles.buttonText}>Delete user tag from onesignal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this._deleteNotificationsFromAsyncStore}
        >
          <Text style={styles.buttonText}>Delete Notifications </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#F5FCFF"
  },
  navBar: {
    backgroundColor: "#303a46",
    width: "100%",
    height: 50
  },
  navBarText: {
    color: "white",
    fontSize: 35
  },
  welcome: {
    fontSize: 20,
    margin: 10
  },
  notificationList: {
    width: "100%"
  },
  notificationContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
    marginBottom: 5
  },
  notificationTitle: {
    fontSize: 20,
    color: "black",
    flex: 1
  },
  notificationText: {
    color: "grey",
    fontSize: 15
  },
  separator: {
    color: "black"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  }
});

export default NotificationListScreen;
