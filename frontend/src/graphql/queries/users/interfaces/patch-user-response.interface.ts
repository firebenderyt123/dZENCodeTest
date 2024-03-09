import { PATCH_USER_NAME } from "../patch-user.mutation";
import { User } from "./user.interface";

export interface PatchUserResponse {
  [PATCH_USER_NAME]: User;
}
