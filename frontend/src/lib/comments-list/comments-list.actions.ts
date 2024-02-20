import { Comment } from "@/interfaces/comment.interface";
import { Error } from "@/interfaces/error.interface";
import { COMMENTS_LIST } from "./comments-list.enum";

interface CommentsListPendingAction {
  type: typeof COMMENTS_LIST.PENDING;
}

interface CommentsListSuccessAction {
  type: typeof COMMENTS_LIST.SUCCESS;
  payload: Comment[];
}

interface CommentsListErrorAction {
  type: typeof COMMENTS_LIST.ERROR;
  payload: Error;
}

export type CommentsListActions =
  | CommentsListPendingAction
  | CommentsListSuccessAction
  | CommentsListErrorAction;

export const commentsListPending = (): CommentsListPendingAction => ({
  type: COMMENTS_LIST.PENDING,
});

export const commentsListSuccess = (
  comments: Comment[]
): CommentsListSuccessAction => ({
  type: COMMENTS_LIST.SUCCESS,
  payload: comments,
});

export const commentsListError = (error: Error): CommentsListErrorAction => ({
  type: COMMENTS_LIST.ERROR,
  payload: error,
});
