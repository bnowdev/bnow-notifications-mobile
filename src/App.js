import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import Toast from 'react-native-root-toast';

<<<<<<< HEAD
class App extends Component {
  componentDidMount() {
    OneSignal.configure({
      onNotificationOpened: this.handleNotification,
    });
  }
=======
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import OneSignal from "react-native-onesignal";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
>>>>>>> afaa8b83b3f6136bb23e4439766315d05e96d455

  handleNotification(message, data, isActive) {
    if (isActive) {
      Toast.show(message);
    } else {
      // NOTE: This is the point at which you would tap into your routing system
      Alert.alert(message, JSON.stringify({ name: data.room }));
    }
  }

  componentDidMount() {
    OneSignal.configure({});
    Platform.OS === "ios" ? OneSignal.registerForPushNotifications() : null;
  }

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
}

componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
}

onReceived(notification) {
    console.log("Notification received: ", notification);
}

onOpened(openResult) {
  console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
}

onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
}

onIds(device) {
console.log('Device info: ', device);
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the OneSignal Example!
        </Text>
        <Text style={styles.instructions}>
          Using {Platform.OS}? Cool.
        </Text>
        {Platform.OS === 'ios' ?
          <TouchableOpacity
            onPress={() => OneSignal.registerForPushNotifications()}
            style={{ padding: 20, backgroundColor: '#3B5998' }}
          >
            <Text style={{ color: '#fff' }}>Request Push Notification Permission</Text>
          </TouchableOpacity>
        : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;