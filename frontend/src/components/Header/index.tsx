import { useEffect, useRef } from "react";
import { AppBar, Button, Container, Toolbar, styled } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import SignInForm from "../Auth/SignInForm";
import FormDialog from "../FormDialog";

export default function Header() {
  const auth = useAuth();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const signInForm = !auth?.authState.isAuthenticated && (
    <FormDialog ref={buttonRef}>
      <SignInForm />
    </FormDialog>
  );

  const signInButton = !auth?.authState.isAuthenticated && (
    <Button color="inherit" ref={buttonRef}>
      Sign In
    </Button>
  );

  const logoutButton = auth?.authState.isAuthenticated && (
    <Button color="inherit" onClick={auth.logout}>
      Logout
    </Button>
  );

  return (
    <>
      <AppBar position="static">
        <Container>
          <ToolbarStyled>
            {signInButton}
            {logoutButton}
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
