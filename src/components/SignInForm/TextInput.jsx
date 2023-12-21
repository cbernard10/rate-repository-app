import { TextInput as NativeTextInput, StyleSheet } from "react-native";

// const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  console.log(error);
  const textInputStyle = error
    ? { borderColor: "red", borderStyle: "solid", borderWidth: 1, ...style }
    : [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
