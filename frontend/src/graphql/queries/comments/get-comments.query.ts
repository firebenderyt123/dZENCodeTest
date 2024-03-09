import { gql } from "@apollo/client";

export const GET_COMMENTS_QUERY_NAME = "getComments";
export const GET_COMMENTS_QUERY = gql`
  query GetComments(
    $uuid: String!
    $page: Int
    $limit: Int
    $orderBy: String
    $order: String
  ) {
    getComments(
      uuid: $uuid
      page: $page
      limit: $limit
      orderBy: $orderBy
      order: $order
    )
  }
`;
