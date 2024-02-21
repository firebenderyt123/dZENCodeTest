import { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type Props = {
  fieldError?: FieldError;
} & TextFieldProps;
function FormField(
  { fieldError, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      autoFocus
      error={!!fieldError}
      helperText={fieldError?.message}
      ref={ref}
      {...props}
    />
  );
}
export default forwardRef(FormField);
