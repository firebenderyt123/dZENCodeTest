import { gql } from "@apollo/client";

export const GET_USER_NAME = "getUser";
export const GET_USER_QUERY = gql`
  fragment UserFields on User {
    id
    username
    email
    siteUrl
  }

  query GetUser {
    getUser {
      ...UserFields
    }
  }
`;
