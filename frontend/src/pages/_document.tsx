import { Html, Head, Main, NextScript } from "next/document";
import { Box, styled } from "@mui/material";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Body component="body">
        <Main />
        <NextScript />
      </Body>
    </Html>
  );
}

const Body = styled(Box)(() => ({
  margin: "auto",
}));
