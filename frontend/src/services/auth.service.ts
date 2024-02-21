import { SignInRequestProps } from "@/api/auth/sign-in-request.interface";
import { SignUpRequestProps } from "@/api/auth/sign-up-request.interface";
import { AuthResponse } from "@/api/auth/auth-response.interface";
import { Error as MyError } from "@/interfaces/error.interface";
import authApi from "@/api/auth";
import profileApi from "@/api/profile";
import {
  authRequest,
  authFailed,
  authSuccess,
  logoutSuccess,
  profileSuccess,
  profileFailed,
} from "@/lib/auth/auth.slice";
import { AppDispatch } from "@/lib/store";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookies.util";
import BaseService from "./base.service";

class AuthService extends BaseService {
  loginUser = (data: SignInRequestProps) => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    try {
      const response = await authApi.signInRequest(data);
      this.handleAuthentication(response, dispatch);
    } catch (error) {
      super.reportError(error as Error);
    }
  };

  registerUser =
    (data: SignUpRequestProps) => async (dispatch: AppDispatch) => {
      dispatch(authRequest());
      try {
        const response = await authApi.signUpRequest(data);
        this.handleAuthentication(response, dispatch);
      } catch (error) {
        super.reportError(error as Error);
      }
    };

  logoutUser = () => async (dispatch: AppDispatch) => {
    deleteCookie("accessToken");
    dispatch(logoutSuccess());
  };

  getProfile = () => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    const token = getCookie("accessToken");
    try {
      const response = await profileApi.profileGetRequest(token);
      if (super.instanceOfError(response)) {
        dispatch(profileFailed(response));
      } else {
        dispatch(profileSuccess(response));
      }
    } catch (error) {
      super.reportError(error as Error);
    }
  };

  private handleAuthentication = async (
    response: MyError | AuthResponse,
    dispatch: AppDispatch
  ) => {
    if (super.instanceOfError(response)) {
      dispatch(authFailed(response));
    } else {
      setCookie("accessToken", response.accessToken);
      dispatch(authSuccess(response));
    }
  };
}
const authService = new AuthService();
export default authService;

export type SignInProps = SignInRequestProps;
export type SignUpProps = SignUpRequestProps;
