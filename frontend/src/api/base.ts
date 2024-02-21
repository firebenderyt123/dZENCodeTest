import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Error as MyError } from "@/interfaces/error.interface";

export default class BaseApi {
  protected async getRequest<R>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R | MyError>> {
    try {
      return await axios.get<R | MyError>(url, config);
    } catch (error) {
      throw this.requestError<R>(error as AxiosError);
    }
  }

  protected async postRequest<D, R>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R | MyError>> {
    try {
      return await axios.post<R | MyError>(url, data, config);
    } catch (error) {
      throw this.requestError<R>(error as AxiosError);
    }
  }

  protected requestError<R>(
    error: AxiosError,
    message = "Something went wrong :("
  ): AxiosResponse<R> | Error {
    if (!error.response || error.response.status >= 500) {
      console.log(error.message);
      return new Error(message);
    } else {
      return error.response as AxiosResponse<R>;
    }
  }
}
