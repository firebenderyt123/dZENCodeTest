import * as yup from "yup";

export interface CreateCommentSchema {
  text: string;
}

export const createCommentSchema = yup.object().shape({
  text: yup
    .string()
    .required("Comment text is required")
    .min(20, "Minimal length is 20 characters")
    .max(4096, "Maximal length is 4096 characters"),
});
