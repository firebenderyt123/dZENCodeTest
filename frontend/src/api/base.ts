import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ErrorResponse } from "@/interfaces/error-response.interface";

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
        ...this.getAuthHeaders(token),
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

  protected async postAuthorizedRequest<D, R>(
    token: string,
    url: string,
    data?: D,
    captcha?: string
  ): Promise<AxiosResponse<R>> {
    const conf = {
      headers: {
        ...this.getAuthHeaders(token),
        Recaptcha: captcha,
      },
    };
    return this.postRequest<D, R>(url, data, conf);
  }

  protected async postFormDataAuthorizedRequest<D, R>(
    token: string,
    url: string,
    data?: D,
    captcha?: string
  ): Promise<AxiosResponse<R>> {
    const conf = {
      headers: {
        ...this.getAuthHeaders(token),
        "Content-Type": "multipart/form-data",
        Recaptcha: captcha,
      },
    };
    return this.postRequest<D, R>(url, data, conf);
  }

  protected requestError(
    error: AxiosError,
    message = "Something went wrong :("
  ): ErrorResponse | Error {
    if (!error.response || error.response.status >= 500) {
      console.log(error.message);
      return new Error(message);
    } else {
      return error.response.data as ErrorResponse;
    }
  }

  private getAuthHeaders(token: string) {
    return { Authorization: "Bearer " + token };
  }
}
