import { User } from "@/interfaces/user.interface";
import { CommentParent } from "./comment-parent.interface";

export interface CommentWithParent {
  id: number;
  text: string;
  createdAt: string;
  user: User;
  parent: CommentParent | null;
}
