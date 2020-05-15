import requestDecorator from "./requestDecorator";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiMethodType, ApiResponseType } from "../typings/api";

export default async function axiosGet<T>(
  instance: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig,
  isCruitial = false
): Promise<ApiResponseType<T>> {
  const method = ApiMethodType.Get;
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
    console.log("---\nGET ", url, "\n", response.short, "\n---");

    if (response.full.status === 200 || (errorsCount > 10 && !isCruitial)) {
      isFetching = false;
    } else {
      errorsCount++;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return response!;
}
