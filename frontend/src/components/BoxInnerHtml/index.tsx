import { Box, BoxProps } from "@mui/material";

interface BoxInnerHtmlProps {
  html: string;
}

export default function BoxInnerHtml({
  html,
  ...props
}: BoxInnerHtmlProps & BoxProps) {
  return <Box dangerouslySetInnerHTML={{ __html: html }} {...props} />;
}
