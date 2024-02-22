import { useRef } from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  IconButton,
  styled,
  FormHelperText,
} from "@mui/joy";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CodeIcon from "@mui/icons-material/Code";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import htmlTagsService, { AllowedTags } from "@/services/html-tags.service";
import {
  CreateCommentSchema,
  createCommentSchema,
} from "@/schemas/create-comment.shema";

interface CommentBoxProps {
  onSubmit: (data: CreateCommentSchema) => void;
}

export default function CommentBox({ onSubmit }: CommentBoxProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateCommentSchema>({
    resolver: yupResolver(createCommentSchema),
  });
  const { ref, ...commentProps } = register("text");
  const commentRef = useRef<HTMLDivElement | null>(null);
  const commentText = watch("text");

  const wrapWithTagHandler = (tag: AllowedTags) => {
    const container = commentRef.current;
    if (!container) return;
    const textarea = container.firstChild as HTMLTextAreaElement;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    if (startPos === endPos) {
      setValue(
        "text",
        commentText.substring(0, startPos) +
          htmlTagsService.wrapWithTag(tag) +
          commentText.substring(endPos, commentText.length)
      );
    } else {
      setValue(
        "text",
        commentText.substring(0, startPos) +
          htmlTagsService.wrapWithTag(
            tag,
            commentText.substring(startPos, endPos)
          ) +
          commentText.substring(endPos, commentText.length)
      );
    }

    textarea.selectionStart = 1;
    textarea.selectionEnd = textarea.selectionStart;
    textarea.focus();
    trigger("text");
  };

  const submitHandler: SubmitHandler<CreateCommentSchema> = (data) => {
    setValue("text", data.text.trim());
    trigger("text").then((isValid) => {
      if (isValid) {
        onSubmit(data);
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormControl>
        <FormLabel>Your comment</FormLabel>
        <TextareaStyled
          {...commentProps}
          ref={(e) => {
            ref(e);
            commentRef.current = e;
          }}
          placeholder="Type something here…"
          minRows={3}
          error={!!errors.text}
          endDecorator={
            <BottomPanel>
              <IconButton
                variant="soft"
                color="neutral"
                onClick={() => wrapWithTagHandler("strong")}>
                <FormatBold />
              </IconButton>
              <IconButton
                variant="soft"
                color="neutral"
                onClick={() => wrapWithTagHandler("i")}>
                <FormatItalic />
              </IconButton>
              <IconButton
                variant="soft"
                color="neutral"
                onClick={() => wrapWithTagHandler("code")}>
                <CodeIcon />
              </IconButton>
              <IconButton
                variant="soft"
                color="neutral"
                onClick={() => wrapWithTagHandler("a")}>
                <AddLinkIcon />
              </IconButton>
              <IconButton variant="soft" color="neutral">
                <AttachFileIcon />
              </IconButton>
              <SendButton type="submit">Send</SendButton>
            </BottomPanel>
          }
        />
        {errors.text && (
          <FormHelperTextStyled>{errors?.text?.message}</FormHelperTextStyled>
        )}
      </FormControl>
    </form>
  );
}

const TextareaStyled = styled(Textarea)(() => ({
  minWidth: 280,
}));

const BottomPanel = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  paddingTop: theme.spacing(1),
  borderTop: "1px solid",
  borderColor: theme.palette.divider,
  flex: "auto",
}));

const FormHelperTextStyled = styled(FormHelperText)(({ theme }) => ({
  backgroundColor: theme.palette.danger[400],
  color: theme.palette.common.white,
  padding: "0.625rem 0.75rem",
}));

const SendButton = styled(Button)(() => ({
  marginLeft: "auto",
  paddingBottom: "0.125rem",
}));
