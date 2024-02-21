import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Error as MyError } from "@/interfaces/error.interface";

export default class BaseApi {
  protected async getRequest<R>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    try {
      return await axios.get<R>(url, config);
    } catch (error) {
      throw this.requestError(error as AxiosError);
    }
  }

  protected async getAuthorizedRequest<R>(
    token: string,
    url: string,
    config?: AxiosRequestConfig
  ) {
    const conf = {
      headers: {
        Authorization: "Bearer " + token,
      },
      ...config,
    };
    return this.getRequest<R>(url, conf);
  }

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

  protected requestError(
    error: AxiosError,
    message = "Something went wrong :("
  ): MyError | Error {
    if (!error.response || error.response.status >= 500) {
      console.log(error.message);
      return new Error(message);
    } else {
      return error.response.data as MyError;
    }
  }
}
