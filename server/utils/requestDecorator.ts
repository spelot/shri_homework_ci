import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import {
  ApiMethodType,
  ApiResponseType,
  ApiShortResponseError,
  ApiShortResponse,
} from "../typings/api";

function isAxiosError<T>(error: AxiosError | any): error is AxiosError<T> {
  return error && error.isAxiosError;
}

export default async <T>(
  instance: AxiosInstance,
  method: ApiMethodType,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponseType<T>> => {
  let full: AxiosResponse<T>,
    short: ApiShortResponseError | ApiShortResponse<T>,
    response: ApiResponseType<T>;

  try {
    if (method === ApiMethodType.Get) {
      full = await instance.get<T>(url, config);
    } else if (method === ApiMethodType.Post) {
      full = await instance.post<T>(url, data);
    } else {
      full = await instance.delete<T>(url, config);
    }
    short = full.data;
  } catch (error) {
    if (isAxiosError<T>(error) && error.response) {
      console.error(error.toJSON());
      if (error.response.status === 401) {
        console.error(
          "--- 401 Unauthorized Error happen, may be need to change apiToken in .env ---"
        );
        process.exit(1);
      } else if (error.response.status === 500) {
        full = error.response;
        short = {
          status: error.response.status,
          error: error.message,
        };
      } else {
        console.error("--- Unknown error ---");
        process.exit(1);
      }
    } else {
      console.error(error);
      process.exit(1);
    }
  }

  response = {
    full: full!,
    short: short!,
  };
  return response;
};
