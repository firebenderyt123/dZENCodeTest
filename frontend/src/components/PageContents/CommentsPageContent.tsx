import CommentsList from "@/components/CommentsList";
import { useCommentForm } from "@/contexts/CommentFormContext";
import CommentOrderPanel from "../CommentsOrderPanel";
import CommentCreateForm from "../CommentCreateForm";
import { useWs } from "@/hooks/useWs.hook";

export default function CommentsPageContent() {
  const { state } = useCommentForm();
  const { isConnected } = useWs();

  return (
    <>
      {state.replyToCommentId === null && <CommentCreateForm />}
      <CommentOrderPanel />
      {isConnected && <CommentsList />}
    </>
  );
}
