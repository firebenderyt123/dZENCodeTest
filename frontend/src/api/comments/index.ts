import BaseApi from "../base";
import { API_PATH } from "../config";
import { CommentsResponse } from "./comments-response.interface";
import { CommentsGetRequestProps } from "./comments-get.interface";
import { Comment } from "@/interfaces/comment.interface";

class CommentsApi extends BaseApi {
  async commentsGetRequest(
    params: CommentsGetRequestProps
  ): Promise<CommentsResponse> {
    const response = await super.getRequest<CommentsResponse>(
      API_PATH.ROOT + API_PATH.COMMENTS,
      { params }
    );
    return response.data;
  }

  async commentsCreateRequest(
    token: string,
    formData: FormData,
    captcha: string
  ): Promise<Comment> {
    const response = await super.postFormDataAuthorizedRequest<
      FormData,
      Comment
    >(token, API_PATH.ROOT + API_PATH.COMMENTS, formData, captcha);
    return response.data;
  }
}
const commentsApi = new CommentsApi();
export default commentsApi;
