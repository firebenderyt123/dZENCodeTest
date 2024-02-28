import { ReactNode } from "react";
import Header from "./Header";
import Main from "./Main";
import AuthProvider from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <Header />
      <Main>{children}</Main>
    </AuthProvider>
  );
}
