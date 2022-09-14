import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("accessToken")) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        ...config.headers,
      };

      config = {
        ...config,
        headers,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
