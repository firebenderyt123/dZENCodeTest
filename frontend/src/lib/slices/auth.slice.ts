import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/interfaces/user.interface";
import { AuthResponse } from "@/api/auth/auth-response.interface";
import { ErrorData } from "@/interfaces/error.interface";

export interface AuthState {
  pending: boolean;
  user: User | null;
  isAuthenticated: boolean;
  error: ErrorData | null;
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
    authFailed: (state, action: PayloadAction<ErrorData>) => {
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
    profileSuccess: (state, action: PayloadAction<User>) => {
      state.pending = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    profileFailed: (state, action: PayloadAction<ErrorData>) => {
      state.pending = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const {
  authRequest,
  authSuccess,
  authFailed,
  logoutSuccess,
  profileSuccess,
  profileFailed,
} = authSlice.actions;
export default authSlice.reducer;
