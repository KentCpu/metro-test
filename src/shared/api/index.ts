import axios, { type AxiosRequestConfig } from "axios";
import { API_PREFIX } from "@shared/constants";

const SERVER_API_PATH = API_PREFIX;

const axiosInstance = axios.create({
  baseURL: SERVER_API_PATH,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

export const server = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config).then((res) => res.data),

  patch: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),
};
