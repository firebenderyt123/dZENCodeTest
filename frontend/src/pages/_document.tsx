import { Html, Head, Main, NextScript } from "next/document";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Box, styled } from "@mui/material";
import theme from "@/theme";
import StoreProvider from "./StoreProvider";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Body component="body">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <StoreProvider>
              <Main />
              <NextScript />
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </Body>
    </Html>
  );
}

const Body = styled(Box)(() => ({
  margin: "auto",
}));
