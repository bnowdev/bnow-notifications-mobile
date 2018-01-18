/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          date: new Date(),
          title: "Test Notification 1",
          text: "This is a test a test notifications 1"
        },
        {
          date: new Date(),
          title: "Test Notification 2",
          text: "This is a test notifications 2"
        },
        {
          date: new Date(),
          title: "Test Notification 3",
          text: "This is a test a test notifications 3"
        }
      ]
    };
  }

  render() {

    let notifications = null;

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={styles.navBarText}>BusinessNow</Text>
        </View>
        <Text style={styles.welcome}>List of your notifications</Text>
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
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
