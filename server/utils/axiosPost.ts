import requestDecorator from "./requestDecorator";
import { AxiosInstance } from "axios";
import { ApiMethodType, ApiResponseType } from "../typings/api";

export default async function axiosPost<T>(
  instance: AxiosInstance,
  url: string,
  data?: any
): Promise<ApiResponseType<T>> {
  const method = ApiMethodType.Post;
  let isFetching = true,
    errorsCount = 0,
    response: ApiResponseType<T>;

  while (isFetching) {
    response = await requestDecorator<T>(instance, method, url, data);
    console.log("---\nPOST ", url, "\n", response.short, "\n---");

    if (response.full.status === 200 || errorsCount > 10) {
      isFetching = false;
    } else {
      errorsCount++;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return response!;
}
