import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ErrorResponse } from "@/interfaces/error-response.interface";

export default abstract class BaseApi {
  protected async postRequest<D, R>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    try {
      return await axios.post<R>(url, data, config);
    } catch (error) {
      throw this.requestError(error as AxiosError);
    }
  }

  protected async postFormDataAuthorizedRequest<D, R>(
    url: string,
    token: string,
    data: D
  ): Promise<AxiosResponse<R>> {
    const conf = {
      headers: {
        ...this.getAuthHeaders(token),
        "Content-Type": "multipart/form-data",
      },
    };
    return await this.postRequest<D, R>(url, data, conf);
  }

  protected requestError(
    error: AxiosError,
    message = "Something went wrong :("
  ): ErrorResponse | Error {
    console.log(error);
    if (!error.response || error.response.status >= 500) {
      return new Error(message);
    } else {
      return error.response.data as ErrorResponse;
    }
  }

  private getAuthHeaders(token: string) {
    return { Authorization: "Bearer " + token };
  }
}
