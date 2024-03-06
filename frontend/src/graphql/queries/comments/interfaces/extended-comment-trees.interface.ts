import { CommentTree } from "@/lib/interfaces/comment-tree";

export interface ExtendedCommentTrees {
  comments: CommentTree[];
  totalPages: number;
  totalComments: number;
}
