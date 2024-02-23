import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { CommentDraftState } from "@/lib/slices/comment-draft.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import commentsService, {
  CreateCommentProps,
} from "@/services/comments.service";

interface CommentFormContextType {
  commentDraftState: CommentDraftState;
  createComment: (data: CreateCommentProps) => void;
  uploadFile: (file: File[]) => void;
}

const CommentFormContext = createContext<CommentFormContextType | null>(null);
export const useCommentForm = () => useContext(CommentFormContext);

interface CommentFormProviderProps {
  children: ReactNode;
}

export default function CommentFormProvider({
  children,
}: CommentFormProviderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string>("");
  const dispatch = useAppDispatch();
  const commentDraftState = useAppSelector((reducers) => reducers.commentDraft);

  const createComment = useCallback(
    (data: CreateCommentProps) => {
      dispatch(commentsService.createComment(data));
    },
    [dispatch]
  );

  const uploadFile = useCallback((files: File[]) => {
    const [validFiles, errors] =
      commentsService.removeInvalidAttachments(files);
    setFiles((prev) => (prev ? [...prev, ...validFiles] : validFiles));
    setUploadError(!!errors.size ? Array.from(errors).join("\n") : "");
  }, []);

  return (
    <CommentFormContext.Provider
      value={{
        commentDraftState,
        createComment,
        uploadFile,
      }}>
      {children}
    </CommentFormContext.Provider>
  );
}
