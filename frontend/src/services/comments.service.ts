import { CommentsGetRequestProps } from "@/api/comments/comments-get.interface";
import commentsApi from "@/api/comments";
import { AppDispatch } from "@/lib/store";
import {
  commentsError,
  commentsPending,
  commentsSuccess,
} from "@/lib/comments/comments.actions";
import BaseService from "./base.service";

class CommentsService extends BaseService {
  getComments({
    page = 1,
    limit = 25,
    orderBy = "createdAt",
    order = "DESC",
  }: GetCommentsProps) {
    return async (dispatch: AppDispatch) => {
      dispatch(commentsPending());
      try {
        const data = await commentsApi.commentsGetRequest({
          page,
          limit,
          orderBy,
          order,
        });
        if (super.instanceOfError(data)) {
          dispatch(commentsError(data));
        } else {
          dispatch(commentsSuccess(data));
        }
      } catch (error) {
        super.reportError(error as Error);
      }
    };
  }
}
const commentsService = new CommentsService();
export default commentsService;

export type GetCommentsProps = Partial<CommentsGetRequestProps>;
