import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import commentsService from "@/services/comments.service";
import { useMutation } from "@apollo/client";
import {
  ADD_COMMENT_QUERY,
  ADD_COMMENT_QUERY_NAME,
} from "@/graphql/queries/comments/add-comment.mutation";
import { generateContext } from "@/graphql/utils/auth.utils";
import { successNotify } from "@/utils/notifications.utils";
import { CreateCommentProps } from "@/graphql/queries/comments/interfaces/create-comments-props.interface";
import { useAuth } from "./AuthContext";

interface CommentFormContextType {
  state: State;
  formCleared: () => void;
  createComment: (text: string, captcha: string) => void;
  setReplyCommentId: (commentId: number) => void;
  uploadFile: (file: File[]) => void;
  removeFile: (file: MyFile) => void;
}

const CommentFormContext = createContext<CommentFormContextType | null>(null);
export const useCommentForm = () =>
  useContext(CommentFormContext) as CommentFormContextType;

interface State {
  files: MyFile[];
  replyToCommentId: number | null;
  pending: boolean;
  error: string | null;
  commentSent: boolean;
}

const initState: State = {
  files: [],
  replyToCommentId: null,
  pending: false,
  error: null,
  commentSent: false,
};

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
  const [state, setState] = useState<State>(initState);
  const { checkAuthentification } = useAuth();

  const [addComment, { reset, data, error }] = useMutation<{
    [ADD_COMMENT_QUERY_NAME]: boolean;
  }>(ADD_COMMENT_QUERY);

  const createComment = useCallback(
    (text: string, captcha: string) => {
      const commentData: CreateCommentProps = {
        parentId: state.replyToCommentId || null,
        text,
        files: state.files.map((item) => item.data),
      };
      setPending(true);
      addComment({
        variables: commentData,
        ...generateContext(captcha),
      });
    },
    [state.files, state.replyToCommentId, addComment]
  );

  useEffect(() => {
    if (error) {
      setState((prev) => ({
        ...prev,
        pending: false,
      }));
      checkAuthentification();
    }
  }, [checkAuthentification, error]);

  useEffect(() => {
    if (data?.[ADD_COMMENT_QUERY_NAME]) {
      reset();
      setState((prev) => ({
        ...prev,
        files: [],
        pending: false,
        commentSent: true,
      }));
      successNotify("Comment sent");
    }
  }, [data, reset]);

  const setPending = (val: boolean) => {
    setState((prev) => ({ ...prev, pending: val }));
  };

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
      setState((prev) => ({
        ...prev,
        files: [...prev.files, ...filesWithPreview],
        error: !!errors.size ? Array.from(errors)[0] : null,
      }));

      return () => {
        state.files.forEach((file) =>
          URL.revokeObjectURL(file.preview ? file.preview : "")
        );
      };
    },
    [state.files]
  );

  const removeFile = useCallback((file: MyFile) => {
    setState((prev) => ({
      ...prev,
      files: [...prev.files.filter((f) => f !== file)],
    }));
  }, []);

  const setReplyCommentId = useCallback(
    (commentId: number) => {
      const newCommentId =
        state.replyToCommentId !== commentId ? commentId : null;
      setState((prev) => ({
        ...prev,
        replyToCommentId: newCommentId,
      }));
    },
    [state.replyToCommentId]
  );

  const formCleared = useCallback(() => {
    setState((prev) => ({ ...prev, commentSent: false }));
  }, []);

  return (
    <CommentFormContext.Provider
      value={{
        state,
        formCleared,
        createComment,
        setReplyCommentId,
        uploadFile,
        removeFile,
      }}>
      {children}
    </CommentFormContext.Provider>
  );
}
