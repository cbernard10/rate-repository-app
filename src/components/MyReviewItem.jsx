import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import theme from "../theme";
import { format } from "date-fns/format";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const MyReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();

  const navigateToRepo = () => {
    console.log("navigate to", review.repository.id);
    navigate(`/${review.repository.id}`);
  };

  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const { data } = await mutate({
              variables: {
                id: review.id,
              },
            });
            console.log(data);
            refetch();
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <View
        style={{
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
            {review.repository.fullName}
          </Text>
          <Text>{format(review.createdAt, "dd-MM-yyyy")}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 5,
            fontSize: theme.fontSizes.subheading,
            flex: 1,
          }}
          onPress={navigateToRepo}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: theme.fontSizes.subheading,
            }}
          >
            View repository
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
            fontSize: theme.fontSizes.subheading,
            flex: 1,
          }}
          onPress={deleteReview}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: theme.fontSizes.subheading,
            }}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviewItem;
