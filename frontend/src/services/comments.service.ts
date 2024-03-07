import cookiesService from "./cookies.service";
import { removeInvalidFiles } from "@/utils/files.utils";
import { errorNotify, successNotify } from "@/utils/notifications.utils";
import { CommentTree } from "@/graphql/queries/comments/interfaces/comment-tree";
import { chunk, drop, filter, flatMap, forEach } from "lodash";
import { Comment } from "@/graphql/queries/comments/interfaces/comment.interface";
import uploadsApi from "@/rest-api/uploads";

class CommentsService {
  async uploadAttachments(commentId: number, files: File[]): Promise<boolean> {
    const token = cookiesService.getToken();
    const formData = new FormData();
    forEach(files, (file) => {
      formData.append("files", file);
    });
    try {
      return await uploadsApi.uploadCommentAttachments(
        token,
        commentId,
        formData
      );
    } catch (err) {
      errorNotify("Upload attachments failed");
      return false;
    }
  }

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
