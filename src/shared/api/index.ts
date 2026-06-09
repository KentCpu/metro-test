import axios from "axios";

const SERVER_API_PATH = "/api";

export const server = axios.create({
  baseURL: SERVER_API_PATH,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});


server.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
