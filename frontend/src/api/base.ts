import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ErrorResponse } from "@/interfaces/error-response.interface";

export default abstract class BaseApi {
  private readonly endpoint = process.env.graphQlEndpoint as string;

  protected async graphQlRequest<ResponseData>(
    graphqlQuery: {
      operationName: string;
      query: string;
    },
    variables: object = {},
    headers: object = {}
  ) {
    try {
      const response = await axios.post<{
        data: { [key: string]: ResponseData };
      }>(
        this.endpoint,
        { ...graphqlQuery, variables },
        {
          headers,
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw this.requestError(error as AxiosError);
    }
  }

  protected async getRequest<R>(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    try {
      return await axios.get<R>(this.endpoint, config);
    } catch (error) {
      throw this.requestError(error as AxiosError);
    }
  }

  protected async getAuthorizedRequest<R>(
    token: string,
    config?: AxiosRequestConfig
  ) {
    const conf = {
      headers: {
        ...this.getAuthHeaders(token),
      },
      ...config,
    };
    return await this.getRequest<R>(conf);
  }

  protected async postRequest<D, R>(
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    try {
      return await axios.post<R>(this.endpoint, data, config);
    } catch (error) {
      throw this.requestError(error as AxiosError);
    }
  }

  protected async postAuthorizedRequest<D, R>(
    token: string,
    data?: D,
    captcha?: string
  ): Promise<AxiosResponse<R>> {
    const conf = {
      headers: {
        ...this.getAuthHeaders(token),
        ...this.getCaptchaHeaders(captcha),
      },
    };
    return await this.postRequest<D, R>(data, conf);
  }

  protected async postFormDataAuthorizedRequest<D, R>(
    token: string,
    data?: D,
    captcha?: string
  ): Promise<AxiosResponse<R>> {
    const conf = {
      headers: {
        ...this.getAuthHeaders(token),
        ...this.getCaptchaHeaders(captcha),
        "Content-Type": "multipart/form-data",
      },
    };
    return await this.postRequest<D, R>(data, conf);
  }

  protected async patchAuthorizedRequest<D, R>(
    token: string,
    data?: D
  ): Promise<AxiosResponse<R>> {
    const conf = {
      headers: {
        ...this.getAuthHeaders(token),
      },
    };
    try {
      return await axios.patch<R>(this.endpoint, data, conf);
    } catch (error) {
      throw this.requestError(error as AxiosError);
    }
  }

  protected requestError(
    error: AxiosError,
    message = "Something went wrong :("
  ): ErrorResponse | Error {
    console.log(error);
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

  private getCaptchaHeaders(captcha?: string) {
    return { Recaptcha: captcha };
  }
}
