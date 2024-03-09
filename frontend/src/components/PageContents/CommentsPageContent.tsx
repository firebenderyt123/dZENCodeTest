import CommentsList from "@/components/CommentsList";
import { useCommentForm } from "@/contexts/CommentFormContext";
import CommentOrderPanel from "../CommentsOrderPanel";
import CommentCreateForm from "../CommentCreateForm";

export default function CommentsPageContent() {
  const { state } = useCommentForm();

  return (
    <>
      {state.replyToCommentId === null && <CommentCreateForm />}
      <CommentOrderPanel />
      <CommentsList></CommentsList>
    </>
  );
}
