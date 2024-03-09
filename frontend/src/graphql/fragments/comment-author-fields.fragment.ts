import { gql } from "@apollo/client";

export const COMMENT_AUTHOR_FIELDS_FRAGMENT = gql`
  fragment CommentAuthorFields on CommentAuthor {
    id
    username
    email
    siteUrl
  }
`;
