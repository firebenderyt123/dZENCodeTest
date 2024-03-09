import { removeInvalidFiles } from "@/utils/files.utils";
import { CommentTree } from "@/graphql/queries/comments/interfaces/comment-tree";
import { chunk, drop, filter, flatMap } from "lodash";
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

    const tree = flatMap(parentComments, (parentComment) => ({
      replies: filter(
        subTrees,
        (comment) => comment.parent.id === parentComment.id
      ),
      ...parentComment,
    }));
    return tree;
  }

  removeInvalidAttachments(files: File[]): [File[], Set<string>] {
    return removeInvalidFiles(files);
  }
}
const commentsService = new CommentsService();
export default commentsService;
