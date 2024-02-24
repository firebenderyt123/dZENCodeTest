import { ErrorData } from "@/interfaces/error.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CommentDraftState {
  pending: boolean;
  commentText: string;
  error: ErrorData | null;
}

const initialState: CommentDraftState = {
  pending: false,
  commentText: "",
  error: null,
};

const commentDraftSlice = createSlice({
  name: "commentDraft",
  initialState,
  reducers: {
    createCommentRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    createCommentSuccess: (state) => {
      state.pending = false;
      state.commentText = "";
      state.error = null;
    },
    createCommentFailed: (state, action: PayloadAction<ErrorData>) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  createCommentRequest,
  createCommentSuccess,
  createCommentFailed,
} = commentDraftSlice.actions;
export default commentDraftSlice.reducer;
