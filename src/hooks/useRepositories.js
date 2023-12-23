import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const [repositories, setRepositories] = useState();

  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  // better to just return data?.repositories and loading without the useEffect
  useEffect(() => {
    if (data) {
      console.log(data);
      setRepositories(data.repositories);
    }
  }, [data]);

  if (error) {
    throw new Error(
      `could not fetch repositories with variables ${JSON.stringify(
        variables
      )} ${error}`
    );
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories,
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
