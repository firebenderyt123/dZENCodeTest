import { ForwardedRef, forwardRef } from "react";
import {
  Button,
  Box,
  Textarea,
  IconButton,
  styled,
  TextareaProps,
} from "@mui/joy";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CodeIcon from "@mui/icons-material/Code";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { AllowedTags } from "@/services/html-tags.service";

interface CommentBoxProps {
  wrapWithTagHandler: (tag: AllowedTags) => void;
}

function InnerCommentBox(
  { wrapWithTagHandler, ...props }: CommentBoxProps & TextareaProps,
  ref: ForwardedRef<HTMLDivElement> | null
) {
  return (
    <>
      <TextareaStyled
        ref={ref}
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
            <Button>Preview</Button>
            <SendButton
              type="submit"
              loadingPosition="end"
              endDecorator={<SendRoundedIcon />}>
              Send
            </SendButton>
          </BottomPanel>
        }
        {...props}
      />
    </>
  );
}
export default forwardRef(InnerCommentBox);

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

const SendButton = styled(Button)(() => ({
  marginLeft: "auto",
  padding: "0.5rem 0.25rem 0.5rem 0.625rem",
  "& > span": {
    margin: "0 0 -0.0625rem 0",

    "& > svg": {
      height: "1rem",
    },
  },
}));
