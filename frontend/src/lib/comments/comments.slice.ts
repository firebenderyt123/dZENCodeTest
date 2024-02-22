import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "@/interfaces/error.interface";
import { CommentsResponse } from "@/api/comments/comments-response.interface";

export interface CommentsState {
  pending: boolean;
  data: CommentsResponse | null;
  error: Error | null;
}

const initialState: CommentsState = {
  pending: false,
  data: null,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getCommentsRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    getCommentsSuccess: (state, action: PayloadAction<CommentsResponse>) => {
      state.pending = false;
      state.data = action.payload;
      state.error = null;
    },
    getCommentsFailed: (state, action: PayloadAction<Error>) => {
      state.pending = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { getCommentsRequest, getCommentsSuccess, getCommentsFailed } =
  commentsSlice.actions;
export default commentsSlice.reducer;
