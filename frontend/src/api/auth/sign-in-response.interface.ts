import { User } from "@/interfaces/user.interface";

export interface SignInResponse {
  accessToken: string;
  user: User;
}
