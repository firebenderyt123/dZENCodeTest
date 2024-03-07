import { useCallback, useEffect, useRef } from "react";
import { FormControl, styled, FormHelperText, TextareaProps } from "@mui/joy";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import htmlTagsService, { AllowedTags } from "@/services/html-tags.service";
import { CreateCommentSchema } from "@/schemas/create-comment.shema";
import InnerCommentBox from "./InnerCommentBox";
import { useCommentForm } from "@/contexts/CommentFormContext";
import AttachmentsPreviewPanel from "../AttachmentsPreviewPanel";
import Recaptcha, { ReCAPTCHA } from "../Recaptcha";
import { errorNotify } from "@/utils/notifications.utils";
import FormLabel from "../FormParts/FormLabel";

interface WithCommentBoxProps {
  form: UseFormReturn<CreateCommentSchema, any, CreateCommentSchema>;
  submitCallback: (text: string, captcha: string) => void;
}
export const withCommentBox = (WrappedComponent: typeof InnerCommentBox) => {
  return function WithCommentBox({
    form,
    submitCallback,
  }: WithCommentBoxProps & TextareaProps) {
    const { state, removeFile } = useCommentForm();
    const {
      register,
      handleSubmit,
      setValue,
      trigger,
      watch,
      reset,
      formState: { errors },
    } = form;
    const { ref, ...commentProps } = register("text");
    const captchaRef = useRef<ReCAPTCHA | null>(null);
    const commentRef = useRef<HTMLDivElement | null>(null);
    const commentText = watch("text", "");

    const commentError: string = errors?.text?.message || state.error || "";

    const attachmentPreviews = (
      <AttachmentsPreviewPanel files={state.files} removeFile={removeFile} />
    );

    const wrapWithTagHandler = useCallback(
      (tag: AllowedTags) => {
        const container = commentRef.current;
        if (!container) return;
        const textarea = container.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;

        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        const wrappedData = htmlTagsService.wrapSelectedTextWithTag(
          tag,
          commentText,
          startPos,
          endPos
        );
        setValue("text", wrappedData.text);
        textarea.selectionStart = wrappedData.wrapEndPos;
        textarea.selectionEnd = wrappedData.wrapEndPos;

        textarea.focus();
        trigger("text");
      },
      [commentText, setValue, trigger]
    );

    const checkHtmlHandler = useCallback(
      (html: string = commentText) => {
        setValue("text", htmlTagsService.transformHtmlText(html.trim()));
      },
      [commentText, setValue]
    );

    const submitHandler: SubmitHandler<CreateCommentSchema> = (data) => {
      if (!captchaRef.current)
        errorNotify("Ouch! Captcha not loaded, try to refresh page");

      checkHtmlHandler(data.text);
      trigger().then((isValid) => {
        if (isValid && captchaRef.current) {
          const captcha = captchaRef.current.getValue();
          if (captcha) {
            submitCallback(data.text, captcha);
            captchaRef.current.reset();
          } else errorNotify("Captcha is required");
        }
      });
    };

    useEffect(() => {
      if (state.error === null) {
        reset();
      }
    }, [state.error, reset]);

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
          {attachmentPreviews}
          {commentError && (
            <FormHelperTextStyled>{commentError}</FormHelperTextStyled>
          )}
          <RecaptchaStyled ref={captchaRef} />
        </FormControl>
      </form>
    );
  };
};
export default withCommentBox(InnerCommentBox);

const RecaptchaStyled = styled(Recaptcha)(() => ({
  marginTop: "0.5rem",
}));

const FormHelperTextStyled = styled(FormHelperText)(({ theme }) => ({
  backgroundColor: theme.palette.danger[400],
  color: theme.palette.common.white,
  padding: "0.625rem 0.75rem",
  borderRadius: "0.3125rem",
}));
