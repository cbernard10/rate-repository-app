import { View, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import Text from "./Text";
import { useNavigate } from "react-router-native";

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

const RepositoryItem = ({ item, style }) => {
  const navigate = useNavigate();

  const navigateToRepo = () => {
    console.log("navigate to", item.id);
    navigate(`/${item.id}`);
  };

  return (
    <Pressable onPress={navigateToRepo}>
      <View
        testID="repositoryItem"
        style={[style, styles.container, styles.flexCol, styles.gap36]}
      >
        <View style={[styles.flexRow, styles.gap12]}>
          <Image
            source={{ uri: item.ownerAvatarUrl }}
            style={{ width: 50, height: 50 }}
          />
          <View style={[styles.flexCol, styles.gap6, { flexShrink: 1 }]}>
            <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
              {item.fullName}
            </Text>
            <Text color="textSecondary">{item.description}</Text>
            <View style={styles.languageTagContainer}>
              <Text style={styles.languageTagText}>{item.language}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.flexRow, styles.justifyEvenly]}>
          <View style={[styles.flexCol, styles.itemsCenter]}>
            <Text fontWeight="bold">{item.stargazersCount}</Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View style={[styles.flexCol, styles.itemsCenter]}>
            <Text fontWeight="bold">{item.forksCount}</Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={[styles.flexCol, styles.itemsCenter]}>
            <Text fontWeight="bold">{item.reviewCount}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={[styles.flexCol, styles.itemsCenter]}>
            <Text fontWeight="bold">{item.ratingAverage}</Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
