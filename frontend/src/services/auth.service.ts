import { SignInRequestProps } from "@/api/auth/sign-in-request.interface";
import { SignUpRequestProps } from "@/api/auth/sign-up-request.interface";
import { AuthResponse } from "@/graphql/auth/interfaces/sign-in-response.interface";
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
  logout() {
    cookiesService.deleteToken();
  }

  isAuthenticated(): string | null {
    const token: string = cookiesService.getToken();
    if (!token) {
      return null;
    }
    return token;
  }

  deauthIfShould(error: ErrorData, dispatch: AppDispatch) {
    if (error.statusCode === 401) {
      super.showError("Not Authenticated");
    }
  }

  authSuccess(response: AuthResponse) {
    cookiesService.setToken(response.accessToken);
  }
}
const authService = new AuthService();
export default authService;

export type SignInProps = SignInRequestProps;
export type SignUpProps = SignUpRequestProps;
