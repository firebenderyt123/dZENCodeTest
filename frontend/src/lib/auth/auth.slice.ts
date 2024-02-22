import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "@/interfaces/error.interface";
import { User } from "@/interfaces/user.interface";
import { AuthResponse } from "@/api/auth/auth-response.interface";

export interface AuthState {
  pending: boolean;
  user: User | null;
  error: Error | null;
}

const initialState: AuthState = {
  pending: false,
  user: null,
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
      state.error = null;
    },
    authFailed: (state, action: PayloadAction<Error>) => {
      state.pending = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.pending = false;
      state.user = null;
      state.error = null;
    },
    profileSuccess: (state, action: PayloadAction<User>) => {
      state.pending = false;
      state.user = action.payload;
      state.error = null;
    },
    profileFailed: (state, action: PayloadAction<Error>) => {
      state.pending = false;
      state.user = null;
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
