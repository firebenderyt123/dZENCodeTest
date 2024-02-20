import { API_PATH } from "../config";
import { CommentsResponse } from "./comments-response.interface";
import BaseApi from "../base";

class CommentsApi extends BaseApi {
  async commentsGetRequest() {
    const response = await super.getRequest<CommentsResponse>(
      API_PATH.ROOT + API_PATH.COMMENTS
    );
    return response.data;
  }
}
const commentsApi = new CommentsApi();
export default commentsApi;
