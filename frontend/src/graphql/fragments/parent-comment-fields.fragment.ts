import { gql } from "@apollo/client";

export const PARENT_COMMENT_FIELDS_FRAGMENT = gql`
  fragment ParentCommentFields on ParentComment {
    id
    text
  }
`;
