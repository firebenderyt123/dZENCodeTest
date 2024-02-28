import { ReactNode } from "react";
import { Container, styled } from "@mui/joy";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return <MainStyled>{children}</MainStyled>;
}

const MainStyled = styled(Container)(() => ({
  margin: "auto",
}));
