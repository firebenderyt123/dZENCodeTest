import { gql } from "@apollo/client";

export const ADD_COMMENT_MUTATION_NAME = "addComment";
export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($parentId: Int, $text: String!, $files: [Upload!]!) {
    addComment(parentId: $parentId, text: $text, files: $files)
  }
`;
