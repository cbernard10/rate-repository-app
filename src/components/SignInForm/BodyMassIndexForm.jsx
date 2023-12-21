import { Text, TextInput, Pressable, View } from "react-native";
import { Formik, useField } from "formik";

import FormikTextInput from "./FormikTextInput";

const BodyMassIndexForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="mass" placeholder="Weight (kg)" />
      <FormikTextInput name="height" placeholder="Height (m)" />
      <Pressable onPress={onSubmit}>
        <Text>Calculate</Text>
      </Pressable>
    </View>
  );
};

export default BodyMassIndexForm;
