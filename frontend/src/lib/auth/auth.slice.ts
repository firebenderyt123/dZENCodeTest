import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "@/interfaces/error.interface";
import { User } from "@/interfaces/user.interface";
import { AuthResponse } from "@/api/auth/auth-response.interface";

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
    authSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.pending = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    authFailed: (state, action: PayloadAction<Error>) => {
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

export const { authRequest, authSuccess, authFailed, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
