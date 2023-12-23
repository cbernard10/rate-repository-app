import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (variables) => {
  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(
    GET_REVIEWS,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  if (error) {
    throw new Error(
      `could not fetch reviews with variables ${JSON.stringify(
        variables
      )} ${error}`
    );
  }


  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data?.repository.reviews.edges.map((edge) => edge.node),
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useReviews;
