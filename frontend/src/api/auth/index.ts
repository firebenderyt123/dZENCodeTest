import { API_PATH } from "../config";
import { SignInRequestProps } from "./sign-in-request.interface";
import { SignUpRequestProps } from "./sign-up-request.interface";
import { AuthResponse } from "./auth-response.interface";
import BaseApi from "../base";

class AuthApi extends BaseApi {
  async signInRequest(data: SignInRequestProps) {
    const response = await super.postRequest<SignInRequestProps, AuthResponse>(
      API_PATH.ROOT + API_PATH.SIGN_IN,
      data
    );
    return response.data;
  }

  async signUpRequest(data: SignUpRequestProps) {
    const response = await super.postRequest<SignUpRequestProps, AuthResponse>(
      API_PATH.ROOT + API_PATH.SIGN_UP,
      data
    );
    return response.data;
  }
}
const authApi = new AuthApi();
export default authApi;
