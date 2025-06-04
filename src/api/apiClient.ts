import axios from "axios";
import { baseUrl } from "../const/endpoints/base";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error(
        "Server error:",
        error.response.status,
        error.response.data,
      );
      // Handle specific status codes if needed
      // if (error.response.status === 401) { /* handle unauthorized */ }
    } else if (error.request) {
      // The request was made but no response received (network error)
      // set error.response.data.message to "Network error"
      console.error("Network error: No response received");
      error.response = {
        data: { message: "Network error" },
        status: 0,
      };
      error.isNetworkError = true;
    } else {
      // Something prevented the request from being sent
      console.error("Request configuration error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
