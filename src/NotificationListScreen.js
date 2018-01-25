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
  AsyncStorage
} from "react-native";

class NotificationListScreen extends Component {
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
          text: "This is a test a test notifications 9",
          key: 9
        }
      ]
    };
  }

  static navigationOptions = {
    title: "Your Notifications"
  };

  getSavedNotifications = async () => {
    try {
      let _notifications = await AsyncStorage.getItem(
        "@OneSignalNotifications:key"
      );
      if (_notifications !== null) {
        _notifications = JSON.parse(notifications);
        this.setState({ notifications: _notifications });
      }
    } catch (error) {
      console.log(error);
    }
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

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.navBar}>
          <Text style={styles.navBarText}>BusinessNow</Text>
        </View> */}
        {/* <Text style={styles.welcome}>List of your notifications</Text> */}

        <FlatList
          style={styles.notificationList}
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.notifications}
          renderItem={({ item }) => (
            <View style={styles.notificationContainer}>
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
  }
});

export default NotificationListScreen;
