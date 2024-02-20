import { API_PATH } from "../config";
import { CommentsResponse } from "./comments-response.interface";
import { CommentsGetRequestProps } from "./comments-get.interface";
import BaseApi from "../base";

class CommentsApi extends BaseApi {
  async commentsGetRequest(params: CommentsGetRequestProps) {
    const response = await super.getRequest<CommentsResponse>(
      API_PATH.ROOT + API_PATH.COMMENTS,
      { params }
    );
    return response.data;
  }
}
const commentsApi = new CommentsApi();
export default commentsApi;
