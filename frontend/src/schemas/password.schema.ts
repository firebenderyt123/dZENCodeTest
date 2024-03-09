import * as yup from "yup";

export const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must not exceed 32 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)"
  );
