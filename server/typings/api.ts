import { AxiosResponse } from "axios";

export enum ApiMethodType {
  Get = "get",
  Post = "post",
  Delete = "delete",
}

export type ApiShortResponseError = {
  status?: number;
  error: string;
};

export type ApiShortResponse<T> = T;

export type ApiResponseType<T> = {
  full: AxiosResponse<T>;
  short: ApiShortResponseError | ApiShortResponse<T>;
};

// all interfaces from swagger
export * from "./buildModel";
export * from "./buildModelArrayHomeworkApiRequest";
export * from "./buildModelArrayHomeworkApiResponse";
export * from "./buildModelHomeworkApiResponse";
export * from "./buildRequestResultModel";
export * from "./buildRequestResultModelHomeworkApiResponse";
export * from "./buildStatus";
export * from "./cancelBuildInput";
export * from "./configurationInput";
export * from "./configurationModel";
export * from "./configurationModelHomeworkApiResponse";
export * from "./finishBuildInput";
export * from "./queueBuildInput";
export * from "./startBuildInput";
