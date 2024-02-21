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
export default function EmailField<T extends FieldValues>({
  name,
  register,
  error,
}: Props<T>) {
  return (
    <TextField
      {...register(name, {
        required: "Email is required",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Invalid email address",
        },
      })}
      variant="outlined"
      margin="normal"
      fullWidth
      id="email"
      label="Email Address"
      autoComplete="email"
      autoFocus
      error={!!error}
      helperText={error?.message}
    />
  );
}
