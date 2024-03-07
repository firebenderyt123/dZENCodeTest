import BaseApi from "../base";

const commentsAttachmentsEndpoint = process.env
  .attachmentUploadsEndpoint as string;

class UploadsApi extends BaseApi {
  async uploadCommentAttachments(
    token: string,
    commentId: number,
    formData: FormData
  ): Promise<boolean> {
    const response = await super.postFormDataAuthorizedRequest<
      FormData,
      boolean
    >(commentsAttachmentsEndpoint + `/${commentId}`, token, formData);
    return response.data;
  }
}
const uploadsApi = new UploadsApi();
export default uploadsApi;
