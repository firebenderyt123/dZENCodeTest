import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { TextField } from "@mui/material";

interface Props<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}
export default function PasswordField<T extends FieldValues>({
  name,
  register,
  error,
}: Props<T>) {
  return (
    <TextField
      {...register(name, {
        required: "Password is required",
      })}
      variant="outlined"
      margin="normal"
      fullWidth
      label="Password"
      type="password"
      autoComplete="password"
      error={!!error}
      helperText={error?.message}
    />
  );
}
