import { User } from "@/interfaces/user.interface";

export interface CommentCreated extends Comment {
  parent: CommentParent | null;
}

export interface Comment {
  id: number;
  text: string;
  user: User;
  createdAt: string;
  replies: Comment[];
  attachments: Attachment[];
}

interface CommentParent {
  id: number;
  text: string;
  createdAt: string;
}

interface Attachment {
  fileId: number;
  file: {
    containerName: "images" | "files";
    fileUrl: string;
  };
}
