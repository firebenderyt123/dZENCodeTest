import { SIGN_UP_MUTATION_NAME } from "../sign-up.mutation";
import { AuthResponse } from "./auth.response";

export interface SignUpResponse {
  [SIGN_UP_MUTATION_NAME]: AuthResponse;
}
