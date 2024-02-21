import { API_PATH } from "../config";
import { User } from "@/interfaces/user.interface";
import BaseApi from "../base";

class ProfileApi extends BaseApi {
  async profileGetRequest(token: string) {
    const response = await super.getAuthorizedRequest<User>(
      token,
      API_PATH.ROOT + API_PATH.PROFILE
    );
    return response.data;
  }
}
const profileApi = new ProfileApi();
export default profileApi;
