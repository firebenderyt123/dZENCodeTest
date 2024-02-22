import { SignInRequestProps } from "@/api/auth/sign-in-request.interface";
import { SignUpRequestProps } from "@/api/auth/sign-up-request.interface";
import { AuthResponse } from "@/api/auth/auth-response.interface";
import authApi from "@/api/auth";
import profileApi from "@/api/profile";
import {
  authRequest,
  authFailed,
  authSuccess,
  logoutSuccess,
  profileSuccess,
  profileFailed,
} from "@/lib/slices/auth.slice";
import { AppDispatch } from "@/lib/store";
import BaseService from "./base.service";
import cookiesService from "./cookies.service";

class AuthService extends BaseService {
  loginUser = (data: SignInRequestProps) => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    try {
      const response = await authApi.signInRequest(data);
      this.authSuccess(response, dispatch);
    } catch (error) {
      super.errorHandler(error, (err) => dispatch(authFailed(err)));
    }
  };

  registerUser =
    (data: SignUpRequestProps) => async (dispatch: AppDispatch) => {
      dispatch(authRequest());
      try {
        const response = await authApi.signUpRequest(data);
        this.authSuccess(response, dispatch);
      } catch (error) {
        super.errorHandler(error, (err) => dispatch(authFailed(err)));
      }
    };

  logoutUser = () => async (dispatch: AppDispatch) => {
    cookiesService.deleteToken();
    dispatch(logoutSuccess());
  };

  getProfile = () => async (dispatch: AppDispatch) => {
    dispatch(authRequest());
    const token: string = cookiesService.getToken();
    if (!token) {
      dispatch(logoutSuccess());
      return;
    }
    try {
      const response = await profileApi.profileGetRequest(token);
      dispatch(profileSuccess(response));
    } catch (error) {
      super.errorHandler(error, (err) => {
        dispatch(profileFailed(err));
      });
    }
  };

  private authSuccess(response: AuthResponse, dispatch: AppDispatch) {
    cookiesService.setToken(response.accessToken);
    dispatch(authSuccess(response));
  }
}
const authService = new AuthService();
export default authService;

export type SignInProps = SignInRequestProps;
export type SignUpProps = SignUpRequestProps;
