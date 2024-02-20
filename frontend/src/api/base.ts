import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Error } from "@/interfaces/error.interface";

export default class BaseApi {
  protected async getRequest<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T | Error>> {
    try {
      return await axios.get<T | Error>(url, config);
    } catch (error) {
      throw this.requestError(error as AxiosError);
    }
  }

  protected requestError(
    error: AxiosError,
    message = "Something went wrong :("
  ) {
    console.log(error.message);
    return new Error(message);
  }
}
