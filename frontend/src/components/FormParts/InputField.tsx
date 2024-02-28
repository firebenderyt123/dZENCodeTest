import {
  FormControl,
  FormHelperText,
  Input,
  InputProps,
  styled,
} from "@mui/joy";
import { ForwardedRef, forwardRef } from "react";
import FormLabel from "./FormLabel";

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
      <FormHelperTextStyled>{helperText || " "}</FormHelperTextStyled>
    </FormControl>
  );
}
export default forwardRef(InputField);

const FormHelperTextStyled = styled(FormHelperText)(({ theme }) => ({
  color: theme.palette.danger[400],
  margin: 0,
}));
