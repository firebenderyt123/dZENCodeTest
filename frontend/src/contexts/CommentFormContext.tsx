import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  CommentDraftState,
  replyToComment,
} from "@/lib/slices/comment-draft.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import commentsService, {
  CreateCommentProps,
} from "@/services/comments.service";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT_QUERY } from "@/graphql/queries/comments/add-comment.mutation";
import { generateContext } from "@/graphql/utils/auth.utils";

interface CommentFormContextType {
  state: CommentDraftState;
  files: MyFile[];
  uploadError: string;
  createComment: (data: CreateCommentProps, captcha: string) => void;
  setReplyCommentId: (commentId: number | null) => void;
  uploadFile: (file: File[]) => void;
  removeFile: (file: MyFile) => void;
}

const CommentFormContext = createContext<CommentFormContextType | null>(null);
export const useCommentForm = () =>
  useContext(CommentFormContext) as CommentFormContextType;

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

  const [addComment, { data }] = useMutation<boolean>(ADD_COMMENT_QUERY);

  const dispatch = useAppDispatch();
  const state = useAppSelector((reducers) => reducers.commentDraft);

  const createComment = useCallback(
    (data: Omit<CreateCommentProps, "parentId">, captcha: string) => {
      const commentFiles = files.map((item) => item.data);
      const commentData = {
        ...data,
        parentId: state.replyToCommentId || undefined,
      };
      console.log(commentFiles);

      addComment({
        variables: { commentUUID: "", files: commentFiles },
        ...generateContext(captcha),
      });
    },
    [addComment, files, state.replyToCommentId]
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

  const setReplyCommentId = useCallback(
    (commentId: number | null) => {
      if (state.replyToCommentId !== commentId)
        dispatch(replyToComment(commentId));
    },
    [dispatch, state.replyToCommentId]
  );

  return (
    <CommentFormContext.Provider
      value={{
        state,
        files,
        uploadError,
        createComment,
        setReplyCommentId,
        uploadFile,
        removeFile,
      }}>
      {children}
    </CommentFormContext.Provider>
  );
}
