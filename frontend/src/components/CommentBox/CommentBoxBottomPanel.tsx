import AttachFileIcon from "@mui/icons-material/AttachFileRounded";
import AddLinkIcon from "@mui/icons-material/AddLinkRounded";
import CodeIcon from "@mui/icons-material/CodeRounded";
import FormatBold from "@mui/icons-material/FormatBoldRounded";
import FormatItalic from "@mui/icons-material/FormatItalicRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import { Box, Button, IconButton, styled } from "@mui/joy";
import { AllowedTags } from "@/services/html-tags.service";

interface CommentBoxBottomPanelProps {
  preview: boolean;
  previewButtonOnClick: () => void;
  wrapWithTagHandler: (tag: AllowedTags) => void;
}

export default function CommentBoxBottomPanel({
  preview,
  previewButtonOnClick,
  wrapWithTagHandler,
}: CommentBoxBottomPanelProps) {
  return (
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
      <IconButton
        variant="soft"
        color={preview ? "primary" : "neutral"}
        onClick={previewButtonOnClick}>
        <PreviewRoundedIcon />
      </IconButton>
      <SendButton
        type="submit"
        loadingPosition="end"
        endDecorator={<SendRoundedIcon />}>
        Send
      </SendButton>
    </BottomPanel>
  );
}

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
