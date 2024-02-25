import { styled } from "@mui/joy";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import InputField from "../FormFields/InputField";
import { ChangeUserInfoSchema } from "@/schemas/change-user-info.schema";
import { useUser } from "@/contexts/UserContext";

interface UserInfo {
  form: UseFormReturn<ChangeUserInfoSchema, any, ChangeUserInfoSchema>;
}
export default function UserInfo({ form }: UserInfo) {
  const user = useUser();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    user?.state.user && (
      <div>
        <InputStyled
          label="Username"
          defaultValue={user.state.user.username}
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username")}
        />
        <InputStyled
          label="E-mail"
          defaultValue={user.state.user.email}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <InputStyled
          label="Home Page"
          defaultValue={user.state.user.siteUrl || ""}
          error={!!errors.siteUrl}
          helperText={errors.siteUrl?.message}
          {...register("siteUrl")}
        />
      </div>
    )
  );
}

const InputStyled = styled(InputField)(() => ({
  maxWidth: "300px",
}));
