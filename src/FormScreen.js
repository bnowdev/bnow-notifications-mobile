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

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  token: t.String
});

class FormScreen extends Component {

  static navigationOptions = {
    title: "Register for notifications"
  };

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
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    //marginTop: 50,
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

export default FormScreen;