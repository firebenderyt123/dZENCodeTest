import { User } from "@/interfaces/user.interface";

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  user: User;
  replies: Comment[];
}
