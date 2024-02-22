import { API_PATH } from "../config";
import { CommentsResponse } from "./comments-response.interface";
import { CommentsGetRequestProps } from "./comments-get.interface";
import { CommentsCreateRequestProps } from "./comments-create.interface";
import { CommentWithParent } from "@/interfaces/comment-with-parent.interface";
import BaseApi from "../base";

class CommentsApi extends BaseApi {
  async commentsGetRequest(params: CommentsGetRequestProps) {
    const response = await super.getRequest<CommentsResponse>(
      API_PATH.ROOT + API_PATH.COMMENTS,
      { params }
    );
    return response.data;
  }

  async commentsCreateRequest(token: string, data: CommentsCreateRequestProps) {
    const response = await super.postAuthorizedRequest<
      CommentsCreateRequestProps,
      CommentWithParent
    >(token, API_PATH.ROOT + API_PATH.COMMENTS, data);
    return response.data;
  }
}
const commentsApi = new CommentsApi();
export default commentsApi;
