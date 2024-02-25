import { useEffect } from "react";
import CommentsList from "@/components/CommentsList";
import CommentBox from "@/components/CommentBox";
import { useComments } from "@/contexts/CommentsContext";
import { useCommentForm } from "@/contexts/CommentFormContext";
import CommentOrderPanel from "../CommentsOrderPanel";

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
          <CommentBox
            commentDraftState={commentForm.commentDraftState}
            onSubmitHandler={commentForm.createComment}
          />
          <CommentOrderPanel />
          <CommentsList
            commentsState={comments.commentsState}
            getComments={comments.getComments}></CommentsList>
        </>
      )}
    </>
  );
}
