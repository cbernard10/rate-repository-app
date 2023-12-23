import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";

import { View, Text, FlatList } from "react-native";
import React from "react";
import MyReviewItem from "./MyReviewItem";

const ItemSeparator = () => (
  <View
    style={{
      height: 10,
    }}
  />
);

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  if (loading) {
    return <Text>loading...</Text>;
  }

  const myReviews = data.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={myReviews}
      renderItem={({ item }) => (
        <MyReviewItem review={item} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
