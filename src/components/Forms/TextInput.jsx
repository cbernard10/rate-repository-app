import { TextInput as NativeTextInput } from "react-native";

const TextInput = ({ style, error, ...props }) => {
  console.log(error);
  const textInputStyle = error
    ? { borderColor: "red", borderStyle: "solid", borderWidth: 1, ...style }
    : [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
