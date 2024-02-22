import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import commentsReducer from "./slices/comments.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
});
export default rootReducer;
