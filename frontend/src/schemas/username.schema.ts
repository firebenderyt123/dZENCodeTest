import * as yup from "yup";

export const usernameSchema = yup
  .string()
  .required("Username is required")
  .max(32, "Username must be at most 32 characters")
  .matches(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed");
