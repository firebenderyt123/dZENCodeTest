import { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type FormFieldProps = {
  fieldError?: FieldError;
} & TextFieldProps;
function FormField(
  { fieldError, ...props }: FormFieldProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      error={!!fieldError}
      helperText={fieldError?.message}
      ref={ref}
      {...props}
    />
  );
}
export default forwardRef(FormField);
