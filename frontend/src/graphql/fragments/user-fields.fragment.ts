import { gql } from "@apollo/client";

export const USER_FIELDS_FRAGMENT = gql`
  fragment UserFields on User {
    id
    username
    email
    siteUrl
  }
`;
