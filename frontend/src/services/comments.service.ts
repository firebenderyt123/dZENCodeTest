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
import authService from "./auth.service";
import { removeInvalidFiles } from "@/utils/files.utils";

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
      try {
        const token: string = cookiesService.getToken();
        const formData = new FormData();
        formData.append(
          "commentData",
          new Blob([JSON.stringify(commentData)], { type: "application/json" })
        );
        files.forEach((file) => {
          formData.append("files", file);
        });
        await commentsApi.commentsCreateRequest(token, formData, captcha);
        dispatch(createCommentSuccess());
      } catch (error) {
        super.errorHandler(error, (err) => {
          dispatch(createCommentFailed(err));
          authService.deauthIfShould(err, dispatch);
        });
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
    return removeInvalidFiles(files);
  }
}
const commentsService = new CommentsService();
export default commentsService;

export type GetCommentsProps = CommentsGetRequestProps;
export type CreateCommentProps = CommentsCreateRequestProps;
