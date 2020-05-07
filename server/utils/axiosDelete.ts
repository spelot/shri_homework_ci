import requestDecorator from "./requestDecorator";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiMethodType, ApiResponseType } from "../typings/api";

export default async function axiosDelete<T>(
  instance: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponseType<T>> {
  const method = ApiMethodType.Delete;
  let isFetching = true,
    errorsCount = 0,
    response: ApiResponseType<T>;

  while (isFetching) {
    response = await requestDecorator<T>(
      instance,
      method,
      url,
      undefined,
      config
    );
    console.log("---\nDELETE ", url, "\n", response.short, "\n---");

    if (response.full.status === 200 || errorsCount > 10) {
      isFetching = false;
    } else {
      errorsCount++;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return response!;
}
