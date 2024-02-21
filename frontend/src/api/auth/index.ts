import { API_PATH } from "../config";
import { SignInRequestProps } from "./sign-in-request.interface";
import { SignInResponse } from "./sign-in-response.interface";
import BaseApi from "../base";

class AuthApi extends BaseApi {
  async signInRequest(data: SignInRequestProps) {
    const response = await super.postRequest<
      SignInRequestProps,
      SignInResponse
    >(API_PATH.ROOT + API_PATH.SIGN_IN, data);
    return response.data;
  }
}
const authApi = new AuthApi();
export default authApi;
