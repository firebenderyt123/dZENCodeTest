import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import {
  ADD_COMMENT_QUERY,
  ADD_COMMENT_QUERY_NAME,
} from "@/graphql/queries/comments/add-comment.mutation";
import { generateContext } from "@/graphql/utils/auth.utils";
import { successNotify } from "@/utils/notifications.utils";

interface CommentFormContextType {
  state: State;
  createComment: (data: CreateCommentProps, captcha: string) => void;
  setReplyCommentId: (commentId: number | null) => void;
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
}

const initState: State = {
  files: [],
  replyToCommentId: null,
  pending: false,
  error: null,
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

  const [addComment, { data }] = useMutation<{
    [ADD_COMMENT_QUERY_NAME]: number;
  }>(ADD_COMMENT_QUERY);

  const createComment = useCallback(
    (data: Omit<CreateCommentProps, "parentId">, captcha: string) => {
      const commentData = {
        ...data,
        parentId: state.replyToCommentId || null,
        hasAttachments: !!state.files.length,
      };
      setPending(true);
      addComment({
        variables: commentData,
        ...generateContext(captcha),
      });
    },
    [state.files, state.replyToCommentId, addComment]
  );

  const onCommentSuccess = useCallback(() => {
    setState(initState);
    successNotify("Comment created");
  }, []);

  useEffect(() => {
    if (data) {
      if (!!state.files.length) {
        const commentFiles = state.files.map((item) => item.data);
        commentsService
          .uploadAttachments(data[ADD_COMMENT_QUERY_NAME], commentFiles)
          .then((isSuccess) => {
            if (isSuccess) {
              setState(initState);
            }
          });
      } else {
        onCommentSuccess();
      }
    }
  }, [data, onCommentSuccess, state.files]);

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
    (commentId: number | null) => {
      if (state.replyToCommentId !== commentId)
        setState((prev) => ({
          ...prev,
          replyToCommentId: commentId,
        }));
    },
    [state.replyToCommentId]
  );

  return (
    <CommentFormContext.Provider
      value={{
        state,
        createComment,
        setReplyCommentId,
        uploadFile,
        removeFile,
      }}>
      {children}
    </CommentFormContext.Provider>
  );
}
