import { Comment } from "./comment.interface";

export interface CommentsList {
  comments: Comment[];
  commentsLength: number[];
  totalPages: number;
  totalComments: number;
}
