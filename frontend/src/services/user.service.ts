import userApi from "@/api/user";
import { AppDispatch } from "@/lib/store";
import BaseService from "./base.service";
import {
  userInfoFailed,
  userInfoRequest,
  userInfoSuccess,
} from "@/lib/slices/user.slice";
import { authSuccess } from "@/lib/slices/auth.slice";
import authService from "./auth.service";
import { UserData } from "@/api/user/user-patch-request.interface";

class UserService extends BaseService {
  getUserInfo = () => async (dispatch: AppDispatch) => {
    const token = authService.isAuthenticated(dispatch);
    if (!token) return;
    dispatch(userInfoRequest());
    try {
      const response = await userApi.userInfoGetRequest(token);
      dispatch(userInfoSuccess(response));
      dispatch(authSuccess());
    } catch (error) {
      super.errorHandler(error, (err) => {
        dispatch(userInfoFailed(err));
        authService.deauthIfShould(err, dispatch);
      });
    }
  };

  changeUserInfo =
    (userId: number, data: UserPatchInfo) => async (dispatch: AppDispatch) => {
      const token = authService.isAuthenticated(dispatch);
      if (!token) return;
      dispatch(userInfoRequest());
      try {
        const response = await userApi.userInfoPatchRequest(
          token,
          userId,
          data
        );
        dispatch(userInfoSuccess(response));
      } catch (error) {
        super.errorHandler(error, (err) => {
          dispatch(userInfoFailed(err));
          authService.deauthIfShould(err, dispatch);
        });
      }
    };
}
const userService = new UserService();
export default userService;

export type UserPatchInfo = UserData;
