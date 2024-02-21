import { Button, Typography, Container } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailField from "@/components/FormFields/EmailField";
import PasswordField from "@/components/FormFields/PasswordField";
import { useAuth } from "@/contexts/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    auth?.login(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailField name="email" register={register} error={errors.email} />
          <PasswordField
            name="password"
            register={register}
            error={errors.password}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
