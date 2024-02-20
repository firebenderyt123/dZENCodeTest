import { combineReducers } from "@reduxjs/toolkit";
import commentsListReducer from "./comments-list/comments-list.reducer";

const rootReducer = combineReducers({
  comments: commentsListReducer,
});
export default rootReducer;
