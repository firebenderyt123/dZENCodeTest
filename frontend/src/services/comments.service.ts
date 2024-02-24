import { CommentsGetRequestProps } from "@/api/comments/comments-get.interface";
import { CommentsCreateRequestProps } from "@/api/comments/comments-create.interface";
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
import commentsWebSocketService from "./comments-websocket.service";

class CommentsService extends BaseService {
  getComments({
    page = 1,
    limit = 25,
    orderBy = "createdAt",
    order = "DESC",
  }: GetCommentsProps) {
    return async (dispatch: AppDispatch) => {
      dispatch(getCommentsRequest());
      try {
        const data = await commentsApi.commentsGetRequest({
          page,
          limit,
          orderBy,
          order,
        });
        dispatch(getCommentsSuccess(data));
      } catch (error) {
        super.errorHandler(error, (err) => dispatch(getCommentsFailed(err)));
      }
    };
  }

  createComment(commentData: CreateCommentProps, files: File[]) {
    return async (dispatch: AppDispatch) => {
      dispatch(createCommentRequest());
      try {
        const token: string = cookiesService.getToken();
        const comment = await commentsApi.commentsCreateRequest(
          token,
          commentData
        );
        await this.uploadAttachments(comment.id, files);
        commentsWebSocketService.publishComment(comment.id);
        dispatch(createCommentSuccess());
      } catch (error) {
        super.errorHandler(error, (err) => dispatch(createCommentFailed(err)));
      }
    };
  }

  onCommentPublished() {
    return async (dispatch: AppDispatch) => {
      commentsWebSocketService.onCommentPublished((comment) => {
        dispatch(insertComment(comment));
      });
    };
  }

  offCommentPublished(): void {
    commentsWebSocketService.offCommentPublished();
  }

  removeInvalidAttachments(files: File[]): [File[], Set<string>] {
    const errors = new Set<string>();
    const newFilesArray = files.filter((file) => {
      switch (file.type) {
        case "image/jpeg":
        case "image/gif":
        case "image/png":
          if (file.size <= 5 * 1024 * 1024) return file; // 5 mb
          errors.add("Image file size should be less than or equal to 5 MB.");
          return;
        case "text/plain":
          if (file.size <= 100 * 1024) return file; // 100 kb
          errors.add("Text file size should be less than or equal to 100 KB.");
          return;
        default:
          errors.add(
            "Invalid file format. Only JPG, GIF, PNG, and TXT files are allowed."
          );
          return;
      }
    });
    return [newFilesArray, errors];
  }

  private async uploadAttachments(commentId: number, files: File[]) {
    if (!!files.length) return;
    const token: string = cookiesService.getToken();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    await commentsApi.uploadAttachments(token, commentId, formData);
  }
}
const commentsService = new CommentsService();
export default commentsService;

export type GetCommentsProps = Partial<CommentsGetRequestProps>;
export type CreateCommentProps = CommentsCreateRequestProps;
