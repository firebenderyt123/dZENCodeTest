import { ReactNode } from "react";
import Header from "./Header";
import Main from "./Main";
import AuthProvider from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <AuthProvider>
      <Header />
      <Main>{children}</Main>
    </AuthProvider>
  );
}
