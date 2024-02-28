import type { AppProps } from "next/app";
import { Bounce, ToastContainer } from "react-toastify";
import StoreProvider from "./StoreProvider";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/layout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import theme from "@/theme";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppRouterCacheProvider>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
        <JoyCssVarsProvider>
          <CssBaseline enableColorScheme />
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
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </AppRouterCacheProvider>
  );
}
