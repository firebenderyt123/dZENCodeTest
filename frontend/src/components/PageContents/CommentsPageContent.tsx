import { useEffect } from "react";
import CommentsList from "@/components/CommentsList";
import CommentBox from "@/components/CommentBox";
import { useComments } from "@/contexts/CommentsContext";

export default function CommentsPageContent() {
  const comments = useComments();

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
      {comments && (
        <>
          <CommentBox
            commentDraftState={comments.commentDraftState}
            onSubmitHandler={comments.createComment}
          />
          <CommentsList
            commentsState={comments.commentsState}
            getComments={comments.getComments}></CommentsList>
        </>
      )}
    </>
  );
}
