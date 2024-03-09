import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION_NAME = "loginUser";
export const SIGN_IN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        ...UserFields
      }
      accessToken
    }
  }
`;
