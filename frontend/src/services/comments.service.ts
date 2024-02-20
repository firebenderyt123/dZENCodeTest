import { AppDispatch } from "@/lib/store";
import {
  commentsError,
  commentsPending,
  commentsSuccess,
} from "@/lib/comments/comments.actions";
import commentsApi from "@/api/comments";
import BaseService from "./base.service";

class CommentsService extends BaseService {
  getComments() {
    return async (dispatch: AppDispatch) => {
      dispatch(commentsPending());
      try {
        const data = await commentsApi.commentsGetRequest();
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
