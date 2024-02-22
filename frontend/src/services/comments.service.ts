import { CommentsGetRequestProps } from "@/api/comments/comments-get.interface";
import { CommentsCreateRequestProps } from "@/api/comments/comments-create.interface";
import commentsApi from "@/api/comments";
import { AppDispatch } from "@/lib/store";
import {
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailed,
} from "@/lib/slices/comments.slice";
import {
  createCommentFailed,
  createCommentRequest,
  createCommentSuccess,
} from "@/lib/slices/comment-draft.slice";
import BaseService from "./base.service";
import cookiesService from "./cookies.service";

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

  createComment(commentData: CommentsCreateRequestProps) {
    return async (dispatch: AppDispatch) => {
      dispatch(createCommentRequest());
      try {
        const token: string = cookiesService.getToken();
        await commentsApi.commentsCreateRequest(token, commentData);
        dispatch(createCommentSuccess());
      } catch (error) {
        super.errorHandler(error, (err) => dispatch(createCommentFailed(err)));
      }
    };
  }
}
const commentsService = new CommentsService();
export default commentsService;

export type GetCommentsProps = Partial<CommentsGetRequestProps>;
