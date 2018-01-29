import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import { NavigationActions } from "react-navigation";
import OneSignal from "react-native-onesignal";
import Toast from "react-native-root-toast";
import t from "tcomb-form-native";

const Form = t.form.Form;

const User = t.struct({
  phonenumber: t.String,
  token: t.String
});

class FormScreen extends Component {
  constructor(props) {
    super(props);
    // this.setState = {
    //   isLoading: false
    // }
  }

  // componentWillMount(){
  //   this.setState({isLoading: true});

  // }

  static navigationOptions = {
    title: "Register for notifications"
  };

  _navigateTo(routeName) {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  /**
   * @description Submits the form (email-token) to OneSignal which saves the key used later
   * @description to retrieve and identify
   */
  handleFormSubmit = () => {
    const value = this._form.getValue(); //  use the ref to get the form value
    if (value) {
      Alert.alert(
        "Is this correct data:",
        `Phone Number: ${value.phonenumber}\nToken: ${value.token}`,
        [
          {
            text: "Send",
            onPress: () => {
              OneSignal.sendTag(
                "serviceNowId",
                `${value.phonenumber}-${value.token}`
              )
              console.log("sendTagsResponse");
              // redirectToNotificationsList();
              this._navigateTo("NotificationList");
            }
          },
          {
            text: "Cancel",
            onPress: () => console.log("Canceled")
          }
        ],
        { cancelable: true }
      );
    }
  };

  render() {
    // if(this.state.isLoading){
    //   console.log('This happens 4th - when waiting for data.');
    //   return <h2>Loading...</h2>;
    // }

    return (
      <View style={styles.formContainer}>
        <Text style={styles.formDescription}>
          Please enter your ServiceNow phone number and generated Notification
          Token.{"\n"}
          Once you submit them you should be able to receive push notification
          from ServiceNow.asdas
        </Text>
        <Form type={User} ref={f => (this._form = f)} />
        <TouchableOpacity style={styles.button} onPress={this.handleFormSubmit}>
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
