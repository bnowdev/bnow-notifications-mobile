import React, { Component } from "react";
import { View, Text } from "react-native";


class NotificationListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      notification: []
    };
  }

  render() {
    return <View style={styles.container}>
      <Text> {this.props.notification.title}</Text>
      <Text> {this.props.notification.body}</Text>
    </View>;
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
