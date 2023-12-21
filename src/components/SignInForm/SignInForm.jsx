import { Text, TextInput, Pressable, View } from "react-native";
import { Formik, useField } from "formik";
import { StyleSheet } from "react-native-web";
import theme from "../../theme";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";

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
const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.inputStyle}
      />
      <FormikTextInput
        name="password"
        secureTextEntry
        placeholder="Password"
        style={styles.inputStyle}
      />
      <Pressable onPress={onSubmit} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
