import { CommentsGetRequestProps } from "@/api/comments/interfaces/get-comments.interface";
import { CommentsCreateRequestProps } from "@/api/comments/interfaces/comments-create.interface";
import commentsApi from "@/api/comments";
import { AppDispatch } from "@/lib/store";
import {
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailed,
  insertComment,
} from "@/lib/slices/comments.slice";
import {
  createCommentFailed,
  createCommentRequest,
  createCommentSuccess,
} from "@/lib/slices/comment-draft.slice";
import BaseService from "./base.service";
import cookiesService from "./cookies.service";
import commentsWebSocketService from "./websocket/comments/comments-websocket.service";
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

export type GetCommentsProps = CommentsGetRequestProps;
export type CreateCommentProps = CommentsCreateRequestProps;
