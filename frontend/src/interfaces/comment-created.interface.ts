import { User } from "@/interfaces/user.interface";

export interface CommentCreated {
  parentId: number;
  id: number;
  text: string;
  user: User;
  createdAt: string;
}
