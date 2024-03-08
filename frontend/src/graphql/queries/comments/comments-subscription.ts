import { gql } from "@apollo/client";

export const COMMENTS_SUBSCRIPTION_NAME = "commentsList";
export const COMMENTS_SUBSCRIPTION = gql`
  fragment ParentCommentFields on ParentComment {
    id
    text
  }

  fragment UserFields on CommentAuthor {
    id
    username
    email
    siteUrl
  }

  fragment AttachmentFields on CommentAttachment {
    fileId
    containerName
    fileUrl
  }

  fragment CommentFields on Comment {
    id
    text
    parent {
      ...ParentCommentFields
    }
    user {
      ...UserFields
    }
    createdAt
    attachments {
      ...AttachmentFields
    }
  }

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
