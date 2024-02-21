import { useRef } from "react";
import { AppBar, Button, Container, Toolbar, styled } from "@mui/material";
import SignInForm from "../Auth/SignInForm";
import FormDialog from "../FormDialog";

export default function Header() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const signInForm = (
    <FormDialog ref={buttonRef}>
      <SignInForm />
    </FormDialog>
  );

  return (
    <>
      <AppBar position="static">
        <Container>
          <ToolbarStyled>
            <Button color="inherit" ref={buttonRef}>
              Sign In
            </Button>
          </ToolbarStyled>
        </Container>
      </AppBar>
      {signInForm}
    </>
  );
}

const ToolbarStyled = styled(Toolbar)(() => ({
  justifyContent: "end",
}));
