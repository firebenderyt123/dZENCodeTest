import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION_NAME = "registerUser";
export const SIGN_UP_MUTATION = gql`
  fragment UserFields on User {
    id
    username
    email
    siteUrl
  }

  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $siteUrl: String
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      siteUrl: $siteUrl
    ) {
      user {
        ...UserFields
      }
      accessToken
    }
  }
`;
