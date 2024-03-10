import { gql } from "@apollo/client";

export const CREATED_COMMENT_SUBSCRIPTION_NAME = "createdComment";
export const CREATED_COMMENT_SUBSCRIPTION = gql`
  subscription CreatedComment($userId: Int!) {
    createdComment(userId: $userId) {
      ...CommentFields
    }
  }
`;
