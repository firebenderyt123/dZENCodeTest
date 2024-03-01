export const getCommentsQuery = {
  operationName: "GetComments",
  query: `fragment ParentCommentFields on ParentComment {
    id
    text
  }
  
  fragment UserFields on CommentAuthor {
    id
    username
    email
    siteUrl
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
      fileId
      containerName
      fileUrl
    }
  }
  
  query GetComments($page: Int, $limit: Int, $orderBy: String, $order: String) {
    getComments(page: $page, limit: $limit, orderBy: $orderBy, order: $order) {
      comments {
        ...CommentFields
      }
      totalPages
      totalComments
    }
  }`,
};
