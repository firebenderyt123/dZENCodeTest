import { User } from "@/interfaces/user.interface";

export interface Comment {
  id: number;
  text: string;
  user: User;
  createdAt: string;
  parent: CommentParent;
  attachments: CommentAttachment[];
}

interface CommentParent {
  id: number;
  text: string;
}

export interface CommentAttachment {
  fileId: number;
  containerName: "images" | "files";
  fileUrl: string;
}
