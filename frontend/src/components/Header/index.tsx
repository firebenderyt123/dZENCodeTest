import { useRef } from "react";
import { AppBar, Button, Container, Toolbar, styled } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import SignInForm from "../Auth/SignInForm";
import SignUpForm from "../Auth/SignUpForm";
import FormDialog from "../FormDialog";

export default function Header() {
  const auth = useAuth();
  const isAuthenticated = auth?.authState?.isAuthenticated ?? false;

  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const signUpButtonRef = useRef<HTMLButtonElement>(null);

  const signInForm = !isAuthenticated && (
    <FormDialog ref={signInButtonRef}>
      <SignInForm />
    </FormDialog>
  );

  const signUpForm = !isAuthenticated && (
    <FormDialog ref={signUpButtonRef}>
      <SignUpForm />
    </FormDialog>
  );

  const signInButton = !isAuthenticated && (
    <Button color="inherit" ref={signInButtonRef}>
      Sign In
    </Button>
  );

  const signUpButton = !isAuthenticated && (
    <Button color="inherit" ref={signUpButtonRef}>
      Sign Up
    </Button>
  );

  const logoutButton = isAuthenticated && (
    <Button color="inherit" onClick={auth?.logout}>
      Logout
    </Button>
  );

  return (
    <>
      <AppBar position="static">
        <Container>
          <ToolbarStyled>
            {signInButton}
            {signUpButton}
            {logoutButton}
          </ToolbarStyled>
        </Container>
      </AppBar>
      {signInForm}
      {signUpForm}
    </>
  );
}

const ToolbarStyled = styled(Toolbar)(() => ({
  justifyContent: "end",
}));
