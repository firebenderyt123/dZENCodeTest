import { Comment } from "@/interfaces/comment.interface";

export interface CommentsResponse {
  comments: Comment[];
  replies: Comment[];
  totalPages: number;
  totalComments: number;
}
