import { SIGN_UP_MUTATION_NAME } from "../sign-up.mutation";
import { Auth } from "./auth.interface";

export interface SignUpResponse {
  [SIGN_UP_MUTATION_NAME]: Auth;
}
