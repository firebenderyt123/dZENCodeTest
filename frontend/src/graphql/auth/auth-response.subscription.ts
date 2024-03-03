import { gql } from "@apollo/client";

export const AUTH_SUBSCRIPTION = gql`
  subscription UserRegisterSuccess(
    $username: String!
    $email: String!
    $password: String!
    $siteUrl: String
  ) {
    userRegisterSuccess(
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
