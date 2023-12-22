import { FlatList, View, StyleSheet } from "react-native";

import { useState, useEffect } from "react";

import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading } = useRepositories();

//   const { data, error, loading } = useQuery(GET_REPOSITORIES, {
//     fetchPolicy: "cache-and-network",
//   });

//   const [repositories, setRepositories] = useState();

//   useEffect(() => {
//     if (data) {
//       setRepositories(data.repositories);
//     }
//   }, [data]);

//   if (error) {
//     console.log(error);
//     return null;
//   }

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  if (loading) {
    return null;
  }
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      // other props
    />
  );
};
// Get the nodes from the edges array
//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];
//   if (loading) {
//     return null;
//   }
//   return (
//     <FlatList
//       data={repositoryNodes}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={({ item }) => <RepositoryItem item={item} />}
//       // other props
//     />
//   );

export default RepositoryList;
