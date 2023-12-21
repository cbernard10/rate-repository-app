import { StyleSheet, Pressable } from "react-native";
import React from "react";
import Text from "./Text";

import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

const AppBarTab = ({ text, to }) => {
  return (
    <Pressable onPress={() => console.log("pressed")}>
      <Link to={to}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
