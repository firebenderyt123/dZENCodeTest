import { removeInvalidFiles } from "@/utils/files.utils";
import { CommentTree } from "@/graphql/queries/comments/interfaces/comment-tree";
import { chunk, drop, dropRight, flatMap } from "lodash";
import { Comment } from "@/graphql/queries/comments/interfaces/comment.interface";

class CommentsService {
  commentArraysToTree(
    comments: Comment[],
    commentsLength: number[]
  ): CommentTree[] {
    if (commentsLength.length < 2) {
      return flatMap(comments, (comment) => ({
        replies: [],
        ...comment,
      }));
    }

    const [parentComments, replies] = chunk(comments, commentsLength[0]);
    const subTrees = this.commentArraysToTree(replies, drop(commentsLength));

    const tree = parentComments.map((parentComment) => ({
      replies: subTrees.filter(
        (comment) => comment.parent?.id === parentComment.id
      ),
      ...parentComment,
    }));
    return tree;
  }

  insertCommentToTree(comment: Comment, trees: CommentTree[]): CommentTree[] {
    if (!comment.parent?.id)
      return [{ ...comment, replies: [] }, ...dropRight(trees)];

    trees.forEach((tree) => {
      if (tree.id === comment.parent?.id) {
        tree.replies.push({ ...comment, replies: [] });
        return tree;
      }

      const updatedReplies = this.insertCommentToTree(comment, tree.replies);
      if (updatedReplies !== tree.replies) {
        return trees.map((t) =>
          t.id === tree.id ? { ...t, replies: updatedReplies } : t
        );
      }
    });

    return trees;
  }

  removeInvalidAttachments(files: File[]): [File[], Set<string>] {
    return removeInvalidFiles(files);
  }
}
const commentsService = new CommentsService();
export default commentsService;
