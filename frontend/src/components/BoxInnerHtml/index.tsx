import { Box, BoxProps } from "@mui/material";
import DOMPurify from "dompurify";

interface BoxInnerHtmlProps {
  html: string;
}

export default function BoxInnerHtml({
  html,
  ...props
}: BoxInnerHtmlProps & BoxProps) {
  const sanitizer = DOMPurify.sanitize;

  return (
    <Box dangerouslySetInnerHTML={{ __html: sanitizer(html) }} {...props} />
  );
}
