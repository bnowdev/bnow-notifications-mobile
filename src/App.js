import React from "react";
import Navigation from "./Navigation";
// import { NavigationActions } from "react-navigation";
import { AsyncStorage, AppState, Alert } from "react-native";
import OneSignal from "react-native-onesignal";
import SplashScreen from "react-native-splash-screen";

let lastNotificationReceived = null;
let lastNotificationOpened = null;
let notificationSeen = false;

const saveToAsyncStorage = async notification => {
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

  console.log("finished async saveToAsyncStorage");
};

const onReceived = notification => {
  console.log("INDEX.JS => received notification", notification);
  Alert.alert("Notification received => onReceived start1","no message");
  //lastNotificationReceived = notification;

  // do save asynchronysly
  saveToAsyncStorage(notification);

  // console.log("AppState.currentState before if", AppState.currentState);
  // if (AppState.currentState === "active") {
  //   console.log("if (AppState.currentState === Active) => alert");

  //  // Alert.alert("Notification opened => onReceived", notification.payload.body);
  //   Alert.alert("Notification received => onReceived if1", "inside if");
  //   lastNotificationReceived = null;
  // } else {
  //   console.log("AppState.currentState else", AppState.currentState);
  //   lastNotificationReceived = notification;
  // }

  // console.log("INDEX.JS => exiting onReceived => Notification");
};

const onOpened = openResult => {
  console.log("Index.js => onOpened =>", openResult);
  Alert.alert("Notification opened => onOpened", "onOpened1");
  // Alert.alert("openResult.notification.payload.title", "openResult.notification.payload.body");
  
  
};

const onAppStateChange = () => {
  console.log("onAppStateChange");
  if (AppState.currentState === "active");
  {
    if (lastNotificationReceived) {
      Alert.alert(
        "Notification opened => appStateChange => Active1",
        lastNotificationReceived.payload.body
      );
    }
  }

  lastNotificationReceived = null;
};

// OneSignal.configure({});
// OneSignal.addEventListener("received", onReceived);
// OneSignal.addEventListener("opened", onOpened);
// AppState.addEventListener("change", onAppStateChange);
// OneSignal.inFocusDisplaying(0);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    OneSignal.configure({});
    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);
    AppState.addEventListener("change", onAppStateChange);
    OneSignal.inFocusDisplaying(0);

    SplashScreen.hide();
  }

  componentWillUnmount(){
    OneSignal.removeEventListener("received", onReceived);
    OneSignal.removeEventListener("opened", onOpened);
    AppState.removeEventListener("change", onAppStateChange);
  }

  render() {
    return <Navigation />;
  }
}
