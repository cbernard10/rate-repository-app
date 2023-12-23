import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import FormikTextInput from "../FormikTextInput";
import theme from "../../../theme";

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: theme.fontSizes.subheading,
  },
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    gap: 12,
  },
});
const NewReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        testID="usernameField"
        name="ownerName"
        placeholder="Repository owner name"
        style={styles.inputStyle}
      />
      <FormikTextInput
        name="repositoryName"
        testID="repositoryNameField"
        placeholder="Repository name"
        style={styles.inputStyle}
      />
      <FormikTextInput
        name="rating"
        testID="ratingField"
        placeholder="Rating between 0 and 100"
        style={styles.inputStyle}
      />
      <FormikTextInput
        name="text"
        testID="reviewField"
        placeholder="Review"
        style={styles.inputStyle}
      />
      <Pressable
        onPress={onSubmit}
        style={styles.buttonStyle}
        testID="submitButton"
      >
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default NewReviewForm;
