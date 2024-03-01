import { CommentAttachment } from "@/interfaces/comment.interface";
import { User } from "@/interfaces/user.interface";

export interface CommentTree {
  id: number;
  text: string;
  user: User;
  createdAt: string;
  replies: CommentTree[];
  attachments: CommentAttachment[];
}
