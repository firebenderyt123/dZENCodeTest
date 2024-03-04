import { SIGN_IN_MUTATION_NAME } from "@/graphql/auth/sign-in.mutation";
import { User } from "@/interfaces/user.interface";

export interface AuthResponse {
  accessToken: string;
  user: User;
}
