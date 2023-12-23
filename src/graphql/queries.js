import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          fullName
          description
          language
          name
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          url
          id
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Query($id: ID!) {
    repository(id: $id) {
      fullName
      description
      language
      name
      ownerAvatarUrl
      ownerName
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      url
      id
    }
  }
`;

export const GET_REVIEWS = gql`
query ($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews(first: $first, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      totalCount
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;
