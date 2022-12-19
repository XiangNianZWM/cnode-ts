import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import qs from "qs";
import showMessage from "./status";

const axiosInstance: AxiosInstance = axios.create({
  // 请求地址
  baseURL: "https://cnodejs.org/api/v1",
  // 响应时长
  timeout: 10000,
  // 请求头
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// axios 实例请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求之前做些什么, 例如添加遮罩, 添加token
    const token: string | null = localStorage.getItem("app_token")
      ? localStorage.getItem("app_token")
      : "";

    if (token) {
      if (config.headers && config.headers["Authorization"]) {
        config.headers["Authorization"] = token;
      }
    }
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

// axios 实例响应拦截器
axiosInstance.interceptors.response.use(
  (response: any) => {
    // 数据响应之前做点什么，例如取消遮罩
    if (response.headers.authorization) {
      localStorage.setItem("app_token", response.headers.authorization);
    } else {
      response.data &&
        response.data.token &&
        localStorage.setItem("app_token", response.data.token);
    }

    // 响应成功
    if (response.status === 200) {
      return response.data.data ? response.data.data : response.data;
    } else {
      showMessage(response.status);
      // 提示错误
      return response;
    }
  },
  // 请求失败
  (err) => {
    const { response } = err;
    // 看看请求是否发出，发出且不是2xx的范围
    showMessage(response.status);
    return Promise.reject(err);
  }
);

export default axiosInstance;
