import { View, Text } from "react-native";
import React from "react";
import theme from "../theme";
import { format } from "date-fns/format";

const ReviewItem = ({ review }) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        gap: 12,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          width: 50,
          height: 50,
          borderRadius: 25,
          borderColor: theme.colors.primary,
        }}
      >
        <Text style={{ fontSize: 24, color: theme.colors.primary }}>
          {review.rating}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flexShrink: 1,
        }}
      >
        <Text
          style={{
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes.body,
          }}
        >
          {review.user.username}
        </Text>
        <Text>{format(review.createdAt, 'dd-MM-yyyy')}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
