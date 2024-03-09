import { gql } from "@apollo/client";

export const COMMENT_FIELDS_FRAGMENT = gql`
  fragment CommentFields on Comment {
    id
    text
    parent {
      ...ParentCommentFields
    }
    user {
      ...CommentAuthorFields
    }
    createdAt
    attachments {
      ...AttachmentFields
    }
  }
`;
