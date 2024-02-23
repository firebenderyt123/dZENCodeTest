import { useCallback, useRef } from "react";
import {
  FormControl,
  FormLabel,
  styled,
  FormHelperText,
  TextareaProps,
} from "@mui/joy";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import htmlTagsService, { AllowedTags } from "@/services/html-tags.service";
import {
  CreateCommentSchema,
  createCommentSchema,
} from "@/schemas/create-comment.shema";
import InnerCommentBox from "./InnerCommentBox";
import { transformHtmlText } from "@/utils/sanitize-html";
import { CreateCommentProps } from "@/services/comments.service";
import { CommentDraftState } from "@/lib/slices/comment-draft.slice";

interface WithCommentBoxProps {
  commentDraftState: CommentDraftState;
  onSubmitHandler: (data: CreateCommentProps) => void;
}

export const withCommentBox = (WrappedComponent: typeof InnerCommentBox) => {
  return function WithCommentBox({
    commentDraftState,
    onSubmitHandler,
  }: WithCommentBoxProps & TextareaProps) {
    const {
      register,
      handleSubmit,
      setValue,
      trigger,
      watch,
      formState: { errors },
    } = useForm<CreateCommentSchema>({
      resolver: yupResolver(createCommentSchema),
    });
    const { ref, ...commentProps } = register("text");
    const commentRef = useRef<HTMLDivElement | null>(null);
    const commentText = watch("text", "");

    const commentError: string =
      errors?.text?.message || commentDraftState.error?.message || "";

    const wrapWithTagHandler = useCallback(
      (tag: AllowedTags) => {
        const container = commentRef.current;
        if (!container) return;
        const textarea = container.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;

        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        if (startPos === endPos) {
          const wrappedText = htmlTagsService.wrapWithTag(tag);
          setValue(
            "text",
            commentText.substring(0, startPos) +
              wrappedText +
              commentText.substring(endPos, commentText.length)
          );
          textarea.selectionStart = startPos + wrappedText.length;
        } else {
          const wrappedText = htmlTagsService.wrapWithTag(
            tag,
            commentText.substring(startPos, endPos)
          );
          setValue(
            "text",
            commentText.substring(0, startPos) +
              wrappedText +
              commentText.substring(endPos, commentText.length)
          );
          textarea.selectionStart = startPos + wrappedText.length;
        }

        textarea.selectionEnd = textarea.selectionStart;
        textarea.focus();
        trigger("text");
      },
      [commentText, setValue, trigger]
    );

    const checkHtmlHandler = useCallback(
      (html: string = commentText) => {
        setValue("text", transformHtmlText(html.trim()));
      },
      [commentText, setValue]
    );

    const submitHandler: SubmitHandler<CreateCommentSchema> = (data) => {
      checkHtmlHandler(data.text);
      trigger("text").then((isValid) => {
        if (isValid) {
          onSubmitHandler(data);
        }
      });
    };

    return (
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormControl>
          <FormLabel>Your comment</FormLabel>
          <WrappedComponent
            {...commentProps}
            ref={(e: HTMLDivElement) => {
              ref(e);
              commentRef.current = e;
            }}
            placeholder="Type something here…"
            minRows={3}
            error={!!errors.text}
            commentText={commentText}
            checkHtmlHandler={checkHtmlHandler}
            wrapWithTagHandler={wrapWithTagHandler}
          />
          {commentError && (
            <FormHelperTextStyled>{commentError}</FormHelperTextStyled>
          )}
        </FormControl>
      </form>
    );
  };
};
export default withCommentBox(InnerCommentBox);

const FormHelperTextStyled = styled(FormHelperText)(({ theme }) => ({
  backgroundColor: theme.palette.danger[400],
  color: theme.palette.common.white,
  padding: "0.625rem 0.75rem",
}));
