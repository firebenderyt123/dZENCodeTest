import { Container } from "@mui/joy";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema, signInSchema } from "@/schemas/sign-in.schema";
import InputField from "@/components/FormParts/InputField";
import { AuthButton, Title } from "../Blocks";

export default function SignInForm() {
  const { login, loginData } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    login(data);
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Title>Sign in</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...register("email")}
            helperText={errors.email?.message}
            error={!!errors.email}
            label="E-mail"
            type="email"
          />
          <InputField
            {...register("password")}
            helperText={errors.password?.message}
            error={!!errors.password}
            label="Password"
            type="password"
          />
          <AuthButton
            type="submit"
            fullWidth
            color="primary"
            loading={loginData.loading}>
            Sign In
          </AuthButton>
        </form>
      </div>
    </Container>
  );
}
