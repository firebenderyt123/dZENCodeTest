import { Comment } from "@/interfaces/comment.interface";
import { Error } from "@/interfaces/error.interface";
import { COMMENTS_LIST } from "./comments-list.enum";
import { CommentsListActions } from "./comments-list.actions";

export type CommentsListState = {
  pending: boolean;
  data: Comment[];
  error: Error | null;
};

const initialState: CommentsListState = {
  pending: false,
  data: [],
  error: null,
};

export default function commentsListReducer(
  state = initialState,
  action: CommentsListActions
): CommentsListState {
  switch (action.type) {
    case COMMENTS_LIST.PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case COMMENTS_LIST.SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
      };
    case COMMENTS_LIST.ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
