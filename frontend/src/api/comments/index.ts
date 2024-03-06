import BaseApi from "../base";
import { API_PATH } from "../config";
import { CommentsResponse } from "./interfaces/comments-response.interface";
import { COMMENT_REQUEST_METHOD } from "./enums/comments-requests.enum";
import { getCommentsQuery } from "../../graphql/queries/comments/get-comments.query";
import { GetCommentsProps } from "./interfaces/get-comments.interface";
import { Comment } from "@/graphql/queries/comments/interfaces/comment.interface";

class CommentsApi extends BaseApi {
  async commentsGetRequest(
    params: GetCommentsProps
  ): Promise<CommentsResponse> {
    const response = await super.graphQlRequest<CommentsResponse>(
      getCommentsQuery,
      params
    );
    return response[COMMENT_REQUEST_METHOD.GET_COMMENTS];
  }

  async commentsCreateRequest(
    token: string,
    formData: FormData,
    captcha: string
  ): Promise<Comment> {
    const response = await super.postFormDataAuthorizedRequest<
      FormData,
      Comment
    >(token, formData, captcha);
    return response.data;
  }
}
const commentsApi = new CommentsApi();
export default commentsApi;
