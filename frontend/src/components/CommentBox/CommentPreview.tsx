import { Box, BoxProps } from "@mui/material";

interface CommentPreviewProps {
  html: string;
}

export default function CommentPreview({
  html,
  ...props
}: CommentPreviewProps & BoxProps) {
  return <Box dangerouslySetInnerHTML={{ __html: html }} {...props} />;
}
