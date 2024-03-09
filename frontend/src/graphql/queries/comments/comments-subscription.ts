import { gql } from "@apollo/client";

export const COMMENTS_SUBSCRIPTION_NAME = "commentsList";
export const COMMENTS_SUBSCRIPTION = gql`
  subscription CommentsList($uuid: String!) {
    commentsList(uuid: $uuid) {
      comments {
        ...CommentFields
      }
      commentsLength
      totalPages
      totalComments
    }
  }
`;
