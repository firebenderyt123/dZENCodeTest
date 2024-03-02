import { useEffect } from "react";
import CommentsList from "@/components/CommentsList";
import { useComments } from "@/contexts/CommentsContext";
import { useCommentForm } from "@/contexts/CommentFormContext";
import CommentOrderPanel from "../CommentsOrderPanel";
import CommentCreateForm from "../CommentCreateForm";
import { useAppDispatch } from "@/lib/hooks";
import commentsService from "@/services/comments.service";

export default function CommentsPageContent() {
  const dispatch = useAppDispatch();
  const comments = useComments();
  const commentForm = useCommentForm();

  useEffect(() => {
    comments.getComments({});
  }, []);

  useEffect(() => {
    dispatch(commentsService.onCommentPublished());
    if (commentForm?.state.pending)
      dispatch(commentsService.onCommentCreateError());

    return () => {
      commentsService.offCommentPublished();
      commentsService.offCommentCreateError();
    };
  }, [commentForm?.state.pending, dispatch]);

  return (
    <>
      {commentForm && (
        <>
          {commentForm.state.replyToCommentId === null && <CommentCreateForm />}
          <CommentOrderPanel />
          <CommentsList
            commentsState={comments.state}
            getComments={comments.getComments}></CommentsList>
        </>
      )}
    </>
  );
}
