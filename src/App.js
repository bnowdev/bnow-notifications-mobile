import React from "react";
import Navigation from "./Navigation";
// import { NavigationActions } from "react-navigation";
import { AsyncStorage } from "react-native";
import OneSignal from "react-native-onesignal";
import SplashScreen from "react-native-splash-screen";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("CLASS: APP => WillMount 2");
    // OneSignal.addEventListener("received", this.addNotificationToAsyncStorage);

    // Hides the custom splash screen which we configured
    console.log("before hiding splash screen");
    SplashScreen.hide();
    console.log("after hiding splash screen");
  }

  //region
  // addNotificationToAsyncStorage = async notification => {
  //   console.log("CLASS: APP => Notification received: ", notification);

  //   let newNotification = {
  //     title: notification.payload.title,
  //     body: notification.payload.body
  //   };

  //   try {
  //     let savedNotificationsStr = await AsyncStorage.getItem(
  //       "@OneSignalNotifications:key"
  //     );
  //     if (savedNotificationsStr !== null) {
  //       console.log("CLASS: APP => notificationsStr", savedNotificationsStr);

  //       let oldNotifications = JSON.parse(savedNotificationsStr);
  //       let updatedNotifications = [newNotification, ...oldNotifications];

  //       await AsyncStorage.setItem(
  //         "@OneSignalNotifications:key",
  //         JSON.stringify(updatedNotifications)
  //       );
  //       console.log("CLASS: APP => updated notification AsyncStorage");
  //     } else {
  //       let initialNotifications = [newNotification];
  //       await AsyncStorage.setItem(
  //         "@OneSignalNotifications:key",
  //         JSON.stringify(initialNotifications)
  //       );

  //       console.log("CLASS: APP => created 1 notification in AsyncStorage");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   console.log("CLASS: APP => exiting addNotificationToAsyncStorage");
  // };
  //endregion


  render() {
    return <Navigation/>;
  }
}
