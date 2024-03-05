import {
  CommentAttachment,
  CommentParent,
} from "@/interfaces/comment.interface";
import { User } from "@/graphql/queries/users/interfaces/user.interface";

export interface CommentTree {
  id: number;
  text: string;
  user: User;
  createdAt: string;
  parent: CommentParent;
  replies: CommentTree[];
  attachments: CommentAttachment[];
}
