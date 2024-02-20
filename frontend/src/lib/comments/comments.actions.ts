import { CommentsResponse } from "@/api/comments/comments-response.interface";
import { Error } from "@/interfaces/error.interface";
import { COMMENTS } from "./comments.enum";

interface CommentsPendingAction {
  type: typeof COMMENTS.PENDING;
}

interface CommentsSuccessAction {
  type: typeof COMMENTS.SUCCESS;
  payload: CommentsResponse;
}

interface CommentsErrorAction {
  type: typeof COMMENTS.ERROR;
  payload: Error;
}

export type CommentsActions =
  | CommentsPendingAction
  | CommentsSuccessAction
  | CommentsErrorAction;

export const commentsPending = (): CommentsPendingAction => ({
  type: COMMENTS.PENDING,
});

export const commentsSuccess = (
  comments: CommentsResponse
): CommentsSuccessAction => ({
  type: COMMENTS.SUCCESS,
  payload: comments,
});

export const commentsError = (error: Error): CommentsErrorAction => ({
  type: COMMENTS.ERROR,
  payload: error,
});
