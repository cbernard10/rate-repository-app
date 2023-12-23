import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  languageTagContainer: {
    backgroundColor: "#0366d6",
    padding: 4,
    borderRadius: 2,
    alignSelf: "flex-start",
  },
  languageTagText: {
    color: "#ffffff",
  },

  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  itemsCenter: {
    alignItems: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyEvenly: {
    justifyContent: "space-evenly",
  },
  gap6: {
    gap: 6,
  },
  gap12: {
    gap: 12,
  },
  gap36: {
    gap: 36,
  },
});

function RepositoryInfo({ repository }) {
  if (!repository) {
    return <Text>loading...</Text>;
  }

  const openLink = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View
      style={[{ padding: 20 }, styles.gap36, styles.container, styles.flexCol]}
    >
      <RepositoryItem item={repository} />

      <Pressable
        onPress={() => {
          openLink();
        }}
        style={{}}
      >
        <View
          style={[
            styles.languageTagContainer,
            {
              flexGrow: 1,
              width: "100%",
              alignItems: "center",
              padding: 10,
              borderRadius: 4,
            },
          ]}
        >
          <Text
            style={[
              styles.languageTagText,
              { fontSize: theme.fontSizes.subheading },
            ]}
          >
            Open in GitHub
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default RepositoryInfo;
