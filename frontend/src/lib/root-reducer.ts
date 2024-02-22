import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import commentsReducer from "./comments/comments.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
});
export default rootReducer;
