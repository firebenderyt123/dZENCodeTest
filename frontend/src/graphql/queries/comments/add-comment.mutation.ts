import { gql } from "@apollo/client";

export const ADD_COMMENT_QUERY_NAME = "addComment";
export const ADD_COMMENT_QUERY = gql`
  mutation UploadAttachments($commentUUID: String!, $files: [Upload!]!) {
    uploadAttachments(commentUUID: $commentUUID, files: $files)
  }
`;
