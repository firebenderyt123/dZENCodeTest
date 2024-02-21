import * as yup from "yup";
import { emailSchema } from "./email.schema";
import { passwordSchema } from "./password.schema";

export interface SignInSchema {
  email: string;
  password: string;
}

export const signInSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
