import { StyleSheet, View } from "react-native";

import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppBar from "./AppBar";

import theme from "../theme";
import SingleRepository from "./SingleRepository";
import NewReview from "./NewReview";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/review" element={<NewReview />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path=":repoId" element={<SingleRepository />} />
      </Routes>
    </View>
  );
};

export default Main;
