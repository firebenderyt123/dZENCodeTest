import { User } from "@/interfaces/user.interface";

export interface AuthResponse {
  accessToken: string;
  user: User;
}
