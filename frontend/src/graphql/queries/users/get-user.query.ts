import { gql } from "@apollo/client";

export const GET_USER_NAME = "getUser";
export const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      ...UserFields
    }
  }
`;
