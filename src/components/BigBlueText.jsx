import { View, StyleSheet } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const BigBlueText = () => {
  return (
    <View style={styles.container}>
      <Text color="primary" fontWeight="bold" fontSize="subheading">
        Big blue text
      </Text>
    </View>
  );
};

export default BigBlueText;
