import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import CommentsReducer from "./comments/comments.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  comments: CommentsReducer,
});
export default rootReducer;
