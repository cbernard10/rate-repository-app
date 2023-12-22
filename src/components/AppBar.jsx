import { View, StyleSheet, ScrollView } from "react-native";
import AppBarTab from "./AppBarTab";
import Constants from "expo-constants";
import theme from "../theme";

import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";

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
  const { data, loading, error } = useQuery(ME);
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log("me data", data);
      client.resetStore();
    }
  }, [data]);

  const handleSignout = () => {
    console.log("signing out");
    authStorage.removeAccessToken().then(() => {
      console.log("token removed");
      client.resetStore();
      navigate("/");
    });
  };

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
        {data && data.me ? (
          <AppBarTab text="Sign out" to="signin" handler={handleSignout} />
        ) : (
          <AppBarTab text="Sign in" to="signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
