import { SIGN_IN_MUTATION_NAME } from "@/graphql/auth/sign-in.mutation";
import { AuthResponse } from "./auth.response";

export interface SignInResponse {
  [SIGN_IN_MUTATION_NAME]: AuthResponse;
}
