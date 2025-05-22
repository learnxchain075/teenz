import { AxiosRequestConfig } from "axios";

import axiosInstance from "../utils/AppAxios";

const BaseApi = {
  postRequest: async (
    url: string,
    postData: unknown = undefined,
    config?: AxiosRequestConfig | undefined
  ) => {
    return await axiosInstance.post(url, postData, config);
  },
  getRequest: async (url: string, config?: AxiosRequestConfig | undefined) => {
    return await axiosInstance.get(url, config);
  },
  putRequest: async (
    url: string,
    postData: Record<string, string | number | undefined | boolean> = {},
    config?: AxiosRequestConfig | undefined
  ) => {
    return await axiosInstance.put(url, postData, config);
  },
  deleteRequest: async (
    url: string,
    config?: AxiosRequestConfig | undefined
  ) => {
    return await axiosInstance.delete(url, config);
  },
  patchRequest: async (
    url: string,
    patchData: Record<string, string | number | undefined | boolean> = {},
    config?: AxiosRequestConfig
  ) => {
    return await axiosInstance.patch(url, patchData, config);
  },
};

export default BaseApi;
