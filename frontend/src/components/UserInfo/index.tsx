import { styled } from "@mui/joy";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../FormFields/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ChangeUserInfoSchema,
  changeUserInfoSchema,
} from "@/schemas/change-user-info.schema";
import { useUser } from "@/contexts/UserContext";
import { UserPatchInfo } from "@/services/user.service";

interface UserInfo {
  onSubmit: (userId: number, data: UserPatchInfo) => void;
}
export default function UserInfo({ onSubmit }: UserInfo) {
  const user = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver<ChangeUserInfoSchema>(changeUserInfoSchema),
  });

  const submitHandler: SubmitHandler<ChangeUserInfoSchema> = (data) => {
    if (user?.state.user?.id) onSubmit(user.state.user.id, data);
  };

  return (
    user?.state.user && (
      <form onSubmit={handleSubmit(submitHandler)}>
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
      </form>
    )
  );
}

const InputStyled = styled(InputField)(() => ({
  maxWidth: "300px",
}));
