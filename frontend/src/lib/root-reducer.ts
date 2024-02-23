import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import commentsSlice from "./slices/comments.slice";
import commentDraftSlice from "./slices/comment-draft.slice";

const rootReducer = combineReducers({
  auth: authSlice,
  comments: commentsSlice,
  commentDraft: commentDraftSlice,
});
export default rootReducer;
