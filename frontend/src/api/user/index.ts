import { API_PATH } from "../config";
import { User } from "@/graphql/queries/users/interfaces/user.interface";
import BaseApi from "../base";
import { UserData } from "./user-patch-request.interface";

class UserApi extends BaseApi {
  async userInfoGetRequest(token: string): Promise<User> {
    const response = await super.getAuthorizedRequest<User>(
      token,
      API_PATH.ROOT + API_PATH.USERS
    );
    return response.data;
  }

  async userInfoPatchRequest(token: string, userData: UserData): Promise<User> {
    const response = await super.patchAuthorizedRequest<UserData, User>(
      token,
      API_PATH.ROOT + API_PATH.USERS,
      userData
    );
    return response.data;
  }
}
const userApi = new UserApi();
export default userApi;
