import { GET_USER_NAME } from "../get-user.query";
import { User } from "./user.interface";

export interface GetUserResponse {
  [GET_USER_NAME]: User;
}
