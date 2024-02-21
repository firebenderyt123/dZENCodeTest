import type { AppProps } from "next/app";
import { Bounce, ToastContainer } from "react-toastify";
import StoreProvider from "./StoreProvider";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/layout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </StoreProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
