import { gql } from "@apollo/client";

export const ATTACHMENT_FIELDS_FRAGMENT = gql`
  fragment AttachmentFields on CommentAttachment {
    fileId
    containerName
    fileUrl
  }
`;
