import { Button, Typography, Container } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "@/components/FormParts/FormField";
import { useAuth } from "@/contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema, signUpSchema } from "@/schemas/sign-up.schema";

export default function SignUpForm() {
  const { register: reg } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    const { repeatPassword, ...userData } = data;
    reg(userData);
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            {...register("email")}
            fieldError={errors.email}
            label="E-mail"
            type="email"
          />
          <FormField
            {...register("username")}
            fieldError={errors.username}
            label="Username"
            type="text"
          />
          <FormField
            {...register("siteUrl")}
            fieldError={errors.siteUrl}
            label="Home page"
            type="url"
          />
          <FormField
            {...register("password")}
            fieldError={errors.password}
            label="Password"
            type="password"
          />
          <FormField
            {...register("repeatPassword")}
            fieldError={errors.repeatPassword}
            label="Repeat Password"
            type="password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
