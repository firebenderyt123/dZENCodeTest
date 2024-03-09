import { styled } from "@mui/joy";
import { UseFormReturn } from "react-hook-form";
import InputField from "../FormParts/InputField";
import { ChangeUserInfoSchema } from "@/schemas/change-user-info.schema";
import { useUser } from "@/contexts/UserContext";

interface UserInfo {
  form: UseFormReturn<ChangeUserInfoSchema, any, ChangeUserInfoSchema>;
}
export default function UserInfo({ form }: UserInfo) {
  const { user } = useUser();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    user && (
      <div>
        <InputStyled
          label="Username"
          defaultValue={user.username}
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username")}
        />
        <InputStyled
          label="E-mail"
          defaultValue={user.email}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <InputStyled
          label="Home Page"
          defaultValue={user.siteUrl || ""}
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
