import * as yup from "yup";
import { emailSchema } from "./email.schema";
import { passwordSchema } from "./password.schema";
import { usernameSchema } from "./username.schema";

export interface SignUpSchema {
  email: string;
  username: string;
  siteUrl?: string;
  password: string;
  repeatPassword: string;
}

export const signUpSchema = yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
  siteUrl: yup.string().optional(),
  password: passwordSchema,
  repeatPassword: yup
    .string()
    .required("Password repeat is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
