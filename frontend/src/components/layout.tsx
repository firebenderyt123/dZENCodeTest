import { ReactNode } from "react";
import Header from "./Header";
import Main from "./Main";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
