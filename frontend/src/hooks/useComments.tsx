import { useCallback } from "react";
import { CommentsState } from "@/lib/slices/comments.slice";
import { CommentDraftState } from "@/lib/slices/comment-draft.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import commentsService, {
  CreateCommentProps,
  GetCommentsProps,
} from "@/services/comments.service";

interface CommentsOutput {
  commentsState: CommentsState;
  commentDraftState: CommentDraftState;
  createComment: (data: CreateCommentProps) => void;
  getComments: (props: GetCommentsProps) => void;
  onCommentPublished: () => void;
  offCommentPublished: () => void;
}

export const useComments = (): CommentsOutput => {
  const dispatch = useAppDispatch();
  const commentsState = useAppSelector((reducers) => reducers.comments);
  const commentDraftState = useAppSelector((reducers) => reducers.commentDraft);

  const createComment = useCallback(
    (data: CreateCommentProps) => {
      dispatch(commentsService.createComment(data));
    },
    [dispatch]
  );

  const getComments = useCallback(
    (props: GetCommentsProps) => {
      dispatch(commentsService.getComments(props));
    },
    [dispatch]
  );

  const onCommentPublished = useCallback(() => {
    dispatch(commentsService.onCommentPublished());
  }, [dispatch]);

  const offCommentPublished = useCallback(() => {
    commentsService.offCommentPublished();
  }, []);

  return {
    commentsState,
    commentDraftState,
    createComment,
    getComments,
    onCommentPublished,
    offCommentPublished,
  };
};
