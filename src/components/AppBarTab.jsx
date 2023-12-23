import { StyleSheet, Pressable } from "react-native";
import React from "react";
import Text from "./Text";

import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const AppBarTab = ({ text, to, handler }) => {
  return !handler ? (
    <Pressable style={{ zIndex: 10 }}>
      <Link to={to}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    </Pressable>
  ) : (
    <Pressable style={{ zIndex: 10 }} onPress={handler}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
