import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/interfaces/user.interface";
import { ErrorData } from "@/interfaces/error.interface";

export interface UserState {
  pending: boolean;
  user: User | null;
  error: ErrorData | null;
}

const initialState: UserState = {
  pending: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfoRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    userInfoSuccess: (state, action: PayloadAction<User>) => {
      state.pending = false;
      state.user = action.payload;
      state.error = null;
    },
    userInfoFailed: (state, action: PayloadAction<ErrorData>) => {
      state.pending = false;
      state.user = null;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});

export const { userInfoRequest, userInfoSuccess, userInfoFailed, userLogout } =
  userSlice.actions;
export default userSlice.reducer;
