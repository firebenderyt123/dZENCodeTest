import { useState } from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  IconButton,
  styled,
} from "@mui/joy";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import htmlTagsService, { AllowedTags } from "@/services/html-tags.service";

interface CommentBoxProps {
  onSubmit: (comment: string) => void;
}

export default function CommentBox({ onSubmit }: CommentBoxProps) {
  const [commentText, setCommentText] = useState("");

  const addTag = (tag: AllowedTags) => {
    setCommentText((prevText) => prevText + htmlTagsService.getTag(tag));
  };

  return (
    <FormControl>
      <FormLabel>Your comment</FormLabel>
      <TextareaStyled
        placeholder="Type something here…"
        minRows={3}
        endDecorator={
          <BottomPanel>
            <IconButton
              variant="plain"
              color="neutral"
              onClick={() => addTag("strong")}
              value={commentText}>
              <FormatBold />
              <KeyboardArrowDown fontSize="medium" />
            </IconButton>
            <IconButton variant={"soft"} color={"primary"}>
              <FormatItalic />
            </IconButton>
            <Button sx={{ ml: "auto" }}>Send</Button>
          </BottomPanel>
        }
      />
    </FormControl>
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
