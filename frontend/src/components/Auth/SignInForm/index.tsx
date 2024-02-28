import { Button, Typography, Container } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "@/components/FormParts/FormField";
import { useAuth } from "@/contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema, signInSchema } from "@/schemas/sign-in.schema";

export default function SignInForm() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    auth?.login(data);
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            {...register("email")}
            fieldError={errors.email}
            label="E-mail"
            type="email"
          />
          <FormField
            {...register("password")}
            fieldError={errors.password}
            label="Password"
            type="password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
