import React from "react";
import Navigation from "./Navigation";
import { AsyncStorage } from "react-native";
import OneSignal from "react-native-onesignal";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("CLASS: APP => WillMount");
    //OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("received",this.addNotificationToAsyncStorage )
  }

  componentWillUnmount() {
    console.log("CLASS: APP => WillUnmount");
    //OneSignal.removeEventListener("received", this.onReceived);
  }

  onReceived(notification) {
    console.log("CLASS: APP => Notification received: ", notification);
    //   this.addNotificationToAsyncStorage(notification);
  }

  addNotificationToAsyncStorage = async notification => {
    console.log("CLASS: APP => Notification received: ", notification);

    let newNotification = {
      title: notification.payload.title,
      body: notification.payload.body
    };

    try {
      let savedNotificationsStr = await AsyncStorage.getItem(
        "@OneSignalNotifications:key"
      );
      if (savedNotificationsStr !== null) {
        console.log("CLASS: APP => notificationsStr", savedNotificationsStr);

        let oldNotifications = JSON.parse(savedNotificationsStr);
        let updatedNotifications = [newNotification, ...oldNotifications];

        await AsyncStorage.setItem(
          "@OneSignalNotifications:key",
          JSON.stringify(updatedNotifications)
        );
        console.log("CLASS: APP => updated notification AsyncStorage");
      } else {
        let initialNotifications = [newNotification];
        await AsyncStorage.setItem(
          "@OneSignalNotifications:key",
          JSON.stringify(initialNotifications)
        );

        console.log("CLASS: APP => created 1 notification in AsyncStorage");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("CLASS: APP => exiting addNotificationToAsyncStorage");
  };

  render() {
    return <Navigation />;
  }
}
