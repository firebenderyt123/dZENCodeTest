import { ReactNode } from "react";
import { Container, styled } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function MainComponent({ children }: Props) {
  return <Main>{children}</Main>;
}

const Main = styled(Container)(() => ({
  margin: "auto",
}));
