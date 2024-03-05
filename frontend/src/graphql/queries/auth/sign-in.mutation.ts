import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION_NAME = "loginUser";
export const SIGN_IN_MUTATION = gql`
  fragment UserFields on User {
    id
    username
    email
    siteUrl
  }

  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        ...UserFields
      }
      accessToken
    }
  }
`;
