import { useEffect } from "react";
import CommentsList from "@/components/CommentsList";
import { useComments } from "@/contexts/CommentsContext";
import { useCommentForm } from "@/contexts/CommentFormContext";
import CommentOrderPanel from "../CommentsOrderPanel";
import CommentCreateForm from "../CommentCreateForm";

export default function CommentsPageContent() {
  const comments = useComments();
  const commentForm = useCommentForm();

  useEffect(() => {
    if (!comments?.state.data && !comments?.state.error)
      comments?.getComments({});
  }, [comments]);

  useEffect(() => {
    comments?.onCommentPublished();

    return () => {
      comments?.offCommentPublished();
    };
  }, [comments]);

  return (
    <>
      {comments && commentForm && (
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
