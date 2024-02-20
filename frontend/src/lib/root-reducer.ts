import { combineReducers } from "@reduxjs/toolkit";
import CommentsReducer from "./comments/comments.reducer";

const rootReducer = combineReducers({
  comments: CommentsReducer,
});
export default rootReducer;
