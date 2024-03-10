import { CREATED_COMMENT_SUBSCRIPTION_NAME } from "../new-comment.subscription";
import { Comment } from "./comment.interface";

export interface AddCommentSubscriptionResponse {
  [CREATED_COMMENT_SUBSCRIPTION_NAME]: Comment;
}
