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
    if (!comments?.commentsState.data && !comments?.commentsState.error)
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
          <CommentCreateForm />
          <CommentOrderPanel />
          <CommentsList
            commentsState={comments.commentsState}
            getComments={comments.getComments}></CommentsList>
        </>
      )}
    </>
  );
}
