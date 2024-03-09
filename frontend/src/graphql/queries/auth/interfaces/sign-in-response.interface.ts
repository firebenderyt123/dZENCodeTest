import { SIGN_IN_MUTATION_NAME } from "../sign-in.mutation";
import { Auth } from "./auth.interface";

export interface SignInResponse {
  [SIGN_IN_MUTATION_NAME]: Auth;
}
