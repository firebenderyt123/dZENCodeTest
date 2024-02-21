import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "@/interfaces/error.interface";
import { User } from "@/interfaces/user.interface";
import { SignInResponse } from "@/api/auth/sign-in-response.interface";

export interface AuthState {
  pending: boolean;
  user: User | null;
  isAuthenticated: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  pending: false,
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<SignInResponse>) => {
      state.pending = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<Error>) => {
      state.pending = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.pending = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { authRequest, loginSuccess, loginFailed, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
