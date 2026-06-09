import axios, { type AxiosRequestConfig } from "axios";

const SERVER_API_PATH = "/api";

const axiosInstance = axios.create({
  baseURL: SERVER_API_PATH,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const server = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T, T>(url, config),

  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T, T>(url, body, config),

  patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T, T>(url, body, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T, T>(url, config),
};
