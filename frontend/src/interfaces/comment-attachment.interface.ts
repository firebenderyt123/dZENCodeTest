export interface CommentAttachment {
  fileId: number;
  file: {
    containerName: "images" | "files";
    fileUrl: string;
  };
}
