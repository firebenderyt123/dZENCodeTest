import * as yup from "yup";

export const emailSchema = yup
  .string()
  .email("Invalid email address")
  .required("Email is required");
