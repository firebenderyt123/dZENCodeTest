import * as yup from "yup";
import { emailSchema } from "./email.schema";
import { usernameSchema } from "./username.schema";

export interface ChangeUserInfoSchema {
  email: string;
  username: string;
  siteUrl?: string;
}

export const changeUserInfoSchema = yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
  siteUrl: yup.string().optional().max(100),
});
