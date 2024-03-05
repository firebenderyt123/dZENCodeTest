import { useEffect, useRef, useState } from "react";
import { AppBar, Button, Container, Toolbar, styled } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import SignInForm from "../Auth/SignInForm";
import SignUpForm from "../Auth/SignUpForm";
import FormDialog from "../FormDialog";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const signUpButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const signInForm = isMounted && !isAuthenticated && (
    <FormDialog ref={signInButtonRef}>
      <SignInForm />
    </FormDialog>
  );

  const signUpForm = isMounted && !isAuthenticated && (
    <FormDialog ref={signUpButtonRef}>
      <SignUpForm />
    </FormDialog>
  );

  const signInButton = isMounted && !isAuthenticated && (
    <Button color="inherit" ref={signInButtonRef}>
      Sign In
    </Button>
  );

  const signUpButton = isMounted && !isAuthenticated && (
    <Button color="inherit" ref={signUpButtonRef}>
      Sign Up
    </Button>
  );

  const logoutButton = isMounted && isAuthenticated && (
    <Button color="inherit" onClick={logout}>
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
