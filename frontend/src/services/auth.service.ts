import { SignInRequestProps } from "@/api/auth/sign-in-request.interface";
import authApi from "@/api/auth";
import {
  authRequest,
  loginFailed,
  loginSuccess,
  logoutSuccess,
} from "@/lib/auth/auth.slice";
import { AppDispatch } from "@/lib/store";
import { deleteCookie, setCookie } from "@/utils/cookies.util";
import BaseService from "./base.service";

class AuthService extends BaseService {
  loginUser = (data: SignInRequestProps) => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    try {
      const response = await authApi.signInRequest(data);
      if (super.instanceOfError(response)) {
        dispatch(loginFailed(response));
      } else {
        setCookie("accessToken", response.accessToken);
        dispatch(loginSuccess(response));
      }
    } catch (error) {
      super.reportError(error as Error);
    }
  };

  logoutUser = () => async (dispatch: AppDispatch) => {
    deleteCookie("accessToken");
    dispatch(logoutSuccess());
  };
}
const authService = new AuthService();
export default authService;

export type SignInProps = SignInRequestProps;
