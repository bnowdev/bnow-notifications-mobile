import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity
} from "react-native";

const window = Dimensions.get("window");

export default function Menu({ onMenuItemSelected }) {
  return (
    <View style={styles.menu}>
      <TouchableOpacity
        onPress={() => onMenuItemSelected("deleteSnId")}
        style={styles.opacity}
      >
        <Text style={styles.text}> Delete the serviceNowId </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onMenuItemSelected("clearNotifications")}
        style={styles.opacity}
      >
        <Text style={styles.text}> Clear notifications </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onMenuItemSelected("refreshNotifications")}
        style={styles.opacity}
      >
        <Text style={styles.text}> Refresh Notifications </Text>
      </TouchableOpacity>


    </View>
  );
}

Menu.propTypes = {
  onMenuItemSelected: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "white",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "black"
  },
  opacity: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#bbb",
    width: "100%"
  },
  text: {
    fontSize:20,
    fontWeight: "500",
    color: "#007AFF"
  }
});
