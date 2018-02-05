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

  componentDidMount() {
    console.log("CLASS: APP => DidMount");
    // OneSignal.addEventListener("received", this.addNotificationToAsyncStorage);

    // Hides the custom splash screen which we configured
    console.log("before hiding splash screen");
    SplashScreen.hide();
    console.log("after hiding splash screen");
  }

  render() {
    return <Navigation/>;
  }
}
