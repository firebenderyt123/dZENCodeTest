import { Comment } from "@/graphql/queries/comments/interfaces/comment.interface";

export interface CommentsResponse {
  comments: Comment[];
  commentsLength: number[];
  totalPages: number;
  totalComments: number;
}
