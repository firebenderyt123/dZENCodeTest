import { User } from "@/graphql/queries/users/interfaces/user.interface";

export interface Auth {
  accessToken: string;
  user: User | null;
}
