import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@mui/joy";
import { ForwardedRef, forwardRef } from "react";

interface InputFieldProps {
  label: string;
  helperText?: string;
}
function InputField(
  { label, helperText, ...props }: InputFieldProps & InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input {...props} ref={ref} />
      <FormHelperText>{helperText || ""}</FormHelperText>
    </FormControl>
  );
}
export default forwardRef(InputField);
