import { CommentTree } from "@/graphql/queries/comments/interfaces/comment-tree";

export interface ExtendedCommentTrees {
  comments: CommentTree[];
  totalPages: number;
  totalComments: number;
}
