import { AppRegistry } from "react-native";
import App from "./src/App";
import { AsyncStorage } from "react-native";
import OneSignal from "react-native-onesignal";

const onReceived = async (notification) => {
  console.log("INDEX.JS => received notification", notification);

  let newNotification = {
    title: notification.payload.title,
    body: notification.payload.body
  };

  try {
    let savedNotificationsStr = await AsyncStorage.getItem(
      "@OneSignalNotifications:key"
    );
    if (savedNotificationsStr !== null) {
      let oldNotifications = JSON.parse(savedNotificationsStr);
      let updatedNotifications = [newNotification, ...oldNotifications];

      await AsyncStorage.setItem(
        "@OneSignalNotifications:key",
        JSON.stringify(updatedNotifications)
      );
    } else {
      let initialNotifications = [newNotification];
      await AsyncStorage.setItem(
        "@OneSignalNotifications:key",
        JSON.stringify(initialNotifications)
      );
    }
  } catch (error) {
    console.log(error);
  }

  console.log("INDEX.JS => exiting onReceived => Notification");
};

const onOpened = (notification) => {
  console.log("Index.js => onOpened =>", notification);
};

OneSignal.addEventListener("received", onReceived);
OneSignal.addEventListener("opened", onOpened);

AppRegistry.registerComponent("BNOWMobilePush", () => App);
