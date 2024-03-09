import { COMMENTS_SUBSCRIPTION_NAME } from "../comments-subscription";
import { CommentsList } from "./comments-list.interface";

export interface GetCommentsResponse {
  [COMMENTS_SUBSCRIPTION_NAME]: CommentsList;
}
