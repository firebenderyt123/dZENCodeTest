export interface Attachment {
  fileId: number;
  file: {
    containerName: string;
    fileUrl: string;
  };
}
