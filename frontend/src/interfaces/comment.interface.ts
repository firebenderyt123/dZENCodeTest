import { User } from "@/interfaces/user.interface";
import { Attachment } from "./comment-attachment.interface";

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  user: User;
  replies: Comment[];
  attachments: Attachment[];
}
