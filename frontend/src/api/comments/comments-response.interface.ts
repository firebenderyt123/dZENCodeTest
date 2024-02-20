import { Comment } from "@/interfaces/comment.interface";

export interface CommentsResponse {
  comments: Comment[];
  total: {
    pages: number;
    comments: number;
  };
}
