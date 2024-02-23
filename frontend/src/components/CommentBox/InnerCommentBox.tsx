import { ForwardedRef, forwardRef, useCallback, useState } from "react";
import { Box, Textarea, styled, TextareaProps } from "@mui/joy";

import { AllowedTags } from "@/services/html-tags.service";
import BoxInnerHtml from "../BoxInnerHtml";
import CommentBoxBottomPanel from "./CommentBoxBottomPanel";

interface CommentBoxProps {
  commentText: string;
  checkHtmlHandler: (html?: string) => void;
  wrapWithTagHandler: (tag: AllowedTags) => void;
}

function InnerCommentBox(
  {
    commentText,
    checkHtmlHandler,
    wrapWithTagHandler,
    ...props
  }: CommentBoxProps & TextareaProps,
  ref: ForwardedRef<HTMLDivElement> | null
) {
  const [preview, setPreview] = useState<boolean>(true);

  const previewButtonOnClick = useCallback(() => {
    setPreview((prev) => !prev);
    checkHtmlHandler();
  }, [checkHtmlHandler]);

  return (
    <>
      <TextareaStyled
        ref={ref}
        startDecorator={
          preview && (
            <TopPanel>
              <CommentPreviewStyled html={commentText} />
            </TopPanel>
          )
        }
        endDecorator={
          <CommentBoxBottomPanel
            preview={preview}
            previewButtonOnClick={previewButtonOnClick}
            wrapWithTagHandler={wrapWithTagHandler}
          />
        }
        {...props}
      />
    </>
  );
}
export default forwardRef(InnerCommentBox);

const TextareaStyled = styled(Textarea)(() => ({
  minWidth: 280,
  position: "relative",
}));

const TopPanel = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  flex: "auto",
  backgroundColor: theme.palette.background.level1,
}));

const CommentPreviewStyled = styled(BoxInnerHtml)(() => ({
  margin: "0.4375rem",
  wordBreak: "break-word",
}));
