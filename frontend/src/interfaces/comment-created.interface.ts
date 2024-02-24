import { User } from "@/interfaces/user.interface";
import { CommentParent } from "./comment-parent";
import { CommentAttachment } from "./comment-attachment.interface";
import { Comment } from "./comment.interface";

export interface CommentCreated {
  parent: CommentParent | null;
  id: number;
  text: string;
  user: User;
  createdAt: string;
  replies: Comment[];
  attachments: CommentAttachment[];
}
