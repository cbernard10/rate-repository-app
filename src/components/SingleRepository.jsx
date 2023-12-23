import { View, Text } from "react-native";
import React from "react";

import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";

import { FlatList } from "react-native";

import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import useReviews from "../hooks/useReviews";

const ItemSeparator = () => (
  <View
    style={{
      height: 10,
    }}
  />
);

const SingleRepository = () => {
  const { repoId } = useParams();
  const { repository } = useRepository(repoId);
  const { reviews, fetchMore } = useReviews({
    repositoryId: repoId,
    first: 4,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (!reviews) {
    return <Text>loading...</Text>;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
