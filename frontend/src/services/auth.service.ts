import { SignInRequestProps } from "@/api/auth/sign-in-request.interface";
import { SignUpRequestProps } from "@/api/auth/sign-up-request.interface";
import { AuthResponse } from "@/api/auth/auth-response.interface";
import authApi from "@/api/auth";
import {
  authRequest,
  authFailed,
  authSuccess,
  authLogout,
} from "@/lib/slices/auth.slice";
import { AppDispatch } from "@/lib/store";
import BaseService from "./base.service";
import cookiesService from "./cookies.service";
import { ErrorData } from "@/interfaces/error.interface";
import { userInfoSuccess, userLogout } from "@/lib/slices/user.slice";

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

  logout = () => (dispatch: AppDispatch) => {
    cookiesService.deleteToken();
    dispatch(authLogout());
    dispatch(userLogout());
  };

  isAuthenticated(dispatch: AppDispatch): string | null {
    const token: string = cookiesService.getToken();
    if (!token) {
      dispatch(this.logout());
      return null;
    }
    return token;
  }

  deauthIfShould(error: ErrorData, dispatch: AppDispatch) {
    if (error.statusCode === 401) {
      dispatch(this.logout());
      super.showError("Not Authenticated");
    }
  }

  private authSuccess(response: AuthResponse, dispatch: AppDispatch) {
    cookiesService.setToken(response.accessToken);
    dispatch(authSuccess());
    dispatch(userInfoSuccess(response.user));
  }
}
const authService = new AuthService();
export default authService;

export type SignInProps = SignInRequestProps;
export type SignUpProps = SignUpRequestProps;
