import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
  InteractionManager
} from "react-native";
import OneSignal from "react-native-onesignal";
import Toast from "react-native-root-toast";
import t from "tcomb-form-native";

// const Form = t.form.Form;

// const User = t.struct({
//   email: t.String,
//   token: t.String
// });

class App extends Component {
  // handleNotification(message, data, isActive) {
  //   if (isActive) {
  //     Toast.show(message);
  //     console.log('hereIF');
  //    } else {
  //     // NOTE: This is the point at which you would tap into your routing system
  //     Alert.alert(message, JSON.stringify({ name: data.room }));
  //     console.log('hereElse')
  //   }
  // }

  // componentDidMount(){
  //   console.log("didMount");
  //   OneSignal.addEventListener("received", this.onReceived);
  //   OneSignal.addEventListener("opened", this.onOpened);
  //   OneSignal.addEventListener("registered", this.onRegistered);
  //   OneSignal.addEventListener("ids", this.onIds);
  // }

  componentWillMount() {
    console.log("didMount");
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("registered", this.onRegistered);
    OneSignal.addEventListener("ids", this.onIds);
  }

  componentWillUnmount() {
    console.log("willUnmount");
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("registered", this.onRegistered);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  // onReceived(notification) {
  //   console.log("Notification received: ", notification);
  //   let string = "sdsd"
  // }

  // onOpened(openResult) {
  //   console.log("Message: ", openResult.notification.payload.body);
  //   console.log("Data: ", openResult.notification.payload.additionalData);
  //   console.log("isActive: ", openResult.notification.isAppInFocus);
  //   console.log("openResult: ", openResult);

  //   var handle = InteractionManager.createInteractionHandle();

  //   Alert.alert(
  //         openResult.notification.payload.title,
  //         openResult.notification.payload.body,
  //         [
  //           {
  //             text: "Send",
  //             onPress: () => console.log("Send")
  //           }
  //         ]
  //     );

  //   InteractionManager.clearInteractionHandle();
  // }

  onRegistered(notifData) {
    console.log(
      "Device had been registered for push notifications!",
      notifData
    );
  }

  // onIds(device) {
  //   console.log("Device info: ", device);
  // }

  handleFormSubmit = () => {
    const value = this._form.getValue(); //  use the ref to get the form value
    if (value) {
      Alert.alert(
        "Are you sure you want to send the data",
        "",
        [
          {
            text: "Send",
            onPress: () => console.log("Send")
          },
          {
            text: "Cancel",
            onPress: () => console.log("Canceled")
          }
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <View>
        <View>
          <Text style={styles.welcome}>Welcome to the OneSignal Example!</Text>
          <Text style={styles.instructions}>
            Using {Platform.OS}? Cool. This is a test
          </Text>
          {Platform.OS === "ios" ? (
            <TouchableOpacity
              onPress={() => OneSignal.registerForPushNotifications()}
              style={{ padding: 20, backgroundColor: "#3B5998" }}
            >
              <Text style={{ color: "#fff" }}>
                Request Push Notification Permission
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formDescription}>
            Please enter your ServiceNow phone number and generated Notification
            Token.{"\n"}
            Once you submit them you should be able to receive push notification
            from ServiceNow.asdas
          </Text>
          <Form type={User} ref={f => (this._form = f)} />
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleFormSubmit}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
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
  },

  formContainer: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "white"
  },
  formDescription: {
    textAlign: "justify"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  }
});

export default App;
