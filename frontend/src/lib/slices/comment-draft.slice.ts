import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CommentDraftState {
  pending: boolean;
  replyToCommentId: number | null;
  error: string | null;
}

const initialState: CommentDraftState = {
  pending: false,
  replyToCommentId: null,
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
      state.replyToCommentId = null;
      state.error = null;
    },
    createCommentFailed: (state, action: PayloadAction<string>) => {
      state.pending = false;
      state.error = action.payload;
    },
    replyToComment: (state, action: PayloadAction<number | null>) => {
      state.replyToCommentId = action.payload;
    },
  },
});

export const {
  createCommentRequest,
  createCommentSuccess,
  createCommentFailed,
  replyToComment,
} = commentDraftSlice.actions;
export default commentDraftSlice.reducer;
