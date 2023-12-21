import { View, StyleSheet, ScrollView } from "react-native";
import AppBarTab from "./AppBarTab";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingBottom: 20,
    paddingHorizontal: 20,
    display: "flex",
  },
  text: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          justifyContent: "space-between",
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          borderwidth: 1,
          borderColor: "red",
          borderStyle: "solid",
          color: "#222222",
        }}
      >
        <AppBarTab text="Repositories" to="/" />
        <AppBarTab text="Sign in" to="signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
