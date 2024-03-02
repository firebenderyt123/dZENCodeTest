import { gql } from "@apollo/client";

export const getCommentsQuery = gql`
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

  query GetComments($page: Int, $limit: Int, $orderBy: String, $order: String) {
    getComments(page: $page, limit: $limit, orderBy: $orderBy, order: $order) {
      comments {
        ...CommentFields
      }
      commentsLength
      totalPages
      totalComments
    }
  }
`;
