import { Container } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema, signUpSchema } from "@/schemas/sign-up.schema";
import { AuthButton, Title } from "../Blocks";
import InputField from "@/components/FormParts/InputField";

export default function SignUpForm() {
  const { register: reg, registerData } = useAuth();
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
        <Title>Sign up</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...register("email")}
            helperText={errors.email?.message}
            error={!!errors.email}
            label="E-mail"
            type="email"
          />
          <InputField
            {...register("username")}
            helperText={errors.username?.message}
            error={!!errors.username}
            label="Username"
            type="text"
          />
          <InputField
            {...register("siteUrl")}
            helperText={errors.siteUrl?.message}
            error={!!errors.siteUrl}
            label="Home page"
            type="url"
          />
          <InputField
            {...register("password")}
            helperText={errors.password?.message}
            error={!!errors.password}
            label="Password"
            type="password"
          />
          <InputField
            {...register("repeatPassword")}
            helperText={errors.repeatPassword?.message}
            error={!!errors.repeatPassword}
            label="Repeat Password"
            type="password"
          />
          <AuthButton
            type="submit"
            fullWidth
            color="primary"
            loading={registerData.loading}>
            Sign Up
          </AuthButton>
        </form>
      </div>
    </Container>
  );
}
