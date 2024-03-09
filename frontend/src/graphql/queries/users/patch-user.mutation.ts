import { gql } from "@apollo/client";

export const PATCH_USER_NAME = "patchUser";
export const PATCH_USER_MUTATION = gql`
  mutation PatchUser($username: String, $email: String, $siteUrl: String) {
    patchUser(username: $username, email: $email, siteUrl: $siteUrl) {
      ...UserFields
    }
  }
`;
