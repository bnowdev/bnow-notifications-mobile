import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import OneSignal from "react-native-onesignal";

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    // this.state({
    //   isRegisteredInOneSignal: false
    // });
  }

  componentDidMount() {
    OneSignal.getTags(receivedTags => {

      if (receivedTags) {
        console.log(receivedTags);
        this._navigateTo("NotificationList");

      } else {
        console.log("No tags");
        this._navigateTo("Form");
      }
    });
 
  }

  _navigateTo(routeName) {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  //region ====== NOT USED FUNCTIONS ========

  // componentDidUpdate() {
  // }

  //_hasServiceNowIdInOneSignal() {}

  //endregion === END YOUR TEXT HERE ====

  render() {
    return <View style={[styles.container,styles.horizontal]}> 
      <ActivityIndicator size="small" color="#0397D5" ></ActivityIndicator>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
