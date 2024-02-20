import { CommentsResponse } from "@/api/comments/comments-response.interface";
import { Error } from "@/interfaces/error.interface";
import { COMMENTS } from "./comments.enum";
import { CommentsActions } from "./comments.actions";

export type CommentsState = {
  pending: boolean;
  data: CommentsResponse | null;
  error: Error | null;
};

const initialState: CommentsState = {
  pending: false,
  data: null,
  error: null,
};

export default function CommentsReducer(
  state = initialState,
  action: CommentsActions
): CommentsState {
  switch (action.type) {
    case COMMENTS.PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case COMMENTS.SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
      };
    case COMMENTS.ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
