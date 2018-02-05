import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

class NotificationDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  //const {params} = navigation.state;

  render() {

    const state = this.props.navigation.state;
    console.log(state);
    const {params} = this.props.navigation.state;
    console.log(params);

    return (
      <View style={styles.container}>
        <Card title={params.notification.title}>
          <Text>{params.notification.body}</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {},
  body: {}
});


export default NotificationDetailsScreen;
