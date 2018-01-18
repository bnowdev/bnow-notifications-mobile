/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";

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
          text: "This is a test a test notifications 1",
          key: 1
        },
        {
          date: new Date(),
          title: "Test Notification 2",
          text: "This is a test notifications 2",
          key: 2
        },
        {
          date: new Date(),
          title: "Test Notification 3",
          text: "This is a test a test notifications 3",
          key: 3
        },
        {
          date: new Date(),
          title: "Test Notification 1",
          text: "This is a test a test notifications 1",
          key: 4
        },
        {
          date: new Date(),
          title: "Test Notification 2",
          text: "This is a test notifications 2",
          key: 5
        },
        {
          date: new Date(),
          title: "Test Notification 3",
          text: "This is a test a test notifications 3",
          key: 6
        },
        {
          date: new Date(),
          title: "Test Notification 1",
          text: "This is a test a test notifications 1",
          key: 7
        },
        {
          date: new Date(),
          title: "Test Notification 2",
          text: "This is a test notifications 2",
          key: 8
        },
        {
          date: new Date(),
          title: "Test Notification 3",
          text: "This is a test a test notifications 3",
          key: 9
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

        <FlatList style={styles.notificationList}
          data={this.state.notifications}
          renderItem={({ item }) => (
            <View  style={styles.notificationContainer}>
              <Text style={styles.notificationTitle}> {item.title}</Text>
              <Text style={styles.notificationText}> {item.text}</Text>
            </View>
          )}
        />
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
    // textAlign: "center",
    margin: 10
  },
  notificationList: {
    width: "100%"
  },
  notificationContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 20
   },
  notificationTitle: {
    fontSize: 20,
    color: "black",
    flex: 1
  },
  notificationText: {
    color: "grey",
    fontSize: 10
  }
});