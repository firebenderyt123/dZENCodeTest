import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorData } from "@/interfaces/error.interface";

export interface AuthState {
  pending: boolean;
  isAuthenticated: boolean;
  error: ErrorData | null;
}

const initialState: AuthState = {
  pending: false,
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
    authSuccess: (state) => {
      state.pending = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    authFailed: (state, action: PayloadAction<ErrorData>) => {
      state.pending = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    authLogout: (state) => {
      state.pending = false;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { authRequest, authSuccess, authFailed, authLogout } =
  authSlice.actions;
export default authSlice.reducer;
