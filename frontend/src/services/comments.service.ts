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
import commentsWebSocketService from "./websocket/comments/comments-websocket.service";
import { removeInvalidFiles } from "@/utils/files.utils";
import { errorNotify } from "@/utils/notifications.utils";

class CommentsService extends BaseService {
  getComments({ page, limit, orderBy, order }: GetCommentsProps) {
    return async (dispatch: AppDispatch) => {
      dispatch(getCommentsRequest());
      try {
        const data = await commentsApi.commentsGetRequest({
          page,
          limit,
          orderBy,
          order,
        });
        dispatch(
          getCommentsSuccess({
            commentsData: data,
            params: {
              page,
              limit,
              orderBy,
              order,
            },
          })
        );
      } catch (error) {
        super.errorHandler(error, (err) => {
          dispatch(getCommentsFailed(err));
        });
      }
    };
  }

  createComment(
    commentData: CreateCommentProps,
    files: File[],
    captcha: string
  ) {
    return async (dispatch: AppDispatch) => {
      dispatch(createCommentRequest());
      const token: string = cookiesService.getToken();
      await commentsWebSocketService.emitCreateComment(
        token,
        commentData,
        files,
        captcha
      );
    };
  }

  onCommentPublished() {
    return async (dispatch: AppDispatch) => {
      commentsWebSocketService.onCommentPublished((comment) => {
        dispatch(createCommentSuccess());
        dispatch(insertComment(comment));
      });
    };
  }

  offCommentPublished(): void {
    commentsWebSocketService.offCommentPublished();
  }

  onCommentCreateError() {
    return async (dispatch: AppDispatch) => {
      commentsWebSocketService.onCommentCreateError((id, message) => {
        dispatch(createCommentFailed(message));
        errorNotify(message);
      });
    };
  }
  offCommentCreateError(): void {
    commentsWebSocketService.offCommentCreateError();
  }

  removeInvalidAttachments(files: File[]): [File[], Set<string>] {
    return removeInvalidFiles(files);
  }
}
const commentsService = new CommentsService();
export default commentsService;

export type GetCommentsProps = CommentsGetRequestProps;
export type CreateCommentProps = CommentsCreateRequestProps;
