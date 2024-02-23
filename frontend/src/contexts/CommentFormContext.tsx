import {
  MouseEvent,
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
  files: MyFile[];
  uploadError: string;
  createComment: (data: CreateCommentProps) => void;
  uploadFile: (file: File[]) => void;
  removeFile: (file: MyFile) => void;
  sendAttachments: () => void;
}

const CommentFormContext = createContext<CommentFormContextType | null>(null);
export const useCommentForm = () => useContext(CommentFormContext);

interface CommentFormProviderProps {
  children: ReactNode;
}

export type MyFile = {
  data: File;
  preview: string | null;
};

export default function CommentFormProvider({
  children,
}: CommentFormProviderProps) {
  const [files, setFiles] = useState<MyFile[]>([]);
  const [uploadError, setUploadError] = useState<string>("");
  const dispatch = useAppDispatch();
  const commentDraftState = useAppSelector((reducers) => reducers.commentDraft);

  const createComment = useCallback(
    (data: CreateCommentProps) => {
      dispatch(commentsService.createComment(data));
    },
    [dispatch]
  );

  const uploadFile = useCallback(
    (newFiles: File[]) => {
      const [validFiles, errors] =
        commentsService.removeInvalidAttachments(newFiles);

      const filesWithPreview = validFiles.map((file) => ({
        data: file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      }));
      setFiles((prev) =>
        prev ? [...prev, ...filesWithPreview] : filesWithPreview
      );
      setUploadError(!!errors.size ? Array.from(errors).join("\n") : "");

      return () => {
        files.forEach((file) =>
          URL.revokeObjectURL(file.preview ? file.preview : "")
        );
      };
    },
    [files]
  );

  const removeFile = useCallback((file: MyFile) => {
    setFiles((prev) => [...prev.filter((f) => f !== file)]);
  }, []);

  const sendAttachments = useCallback(() => {}, []);

  return (
    <CommentFormContext.Provider
      value={{
        commentDraftState,
        files,
        uploadError,
        createComment,
        uploadFile,
        removeFile,
        sendAttachments,
      }}>
      {children}
    </CommentFormContext.Provider>
  );
}