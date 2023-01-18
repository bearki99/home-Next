import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "http://127.0.0.1:4523/m1/2202148-0-default/"; //服务器地址
const TIME_OUT = 1000 * 60;

class myRequest {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    // 全局拦截器
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      console.log("请求拦截");
      return config;
    });

    this.instance.interceptors.response.use((res: AxiosResponse) => {
      console.log("响应的拦截");
      return res;
    });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<T>(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  get<T = any>(url: string, params?: any): Promise<T> {
    return this.request<T>({ url, params, method: "GET" });
  }

  post<T = any>(url: string, data?: any, headers?: any): Promise<T> {
    return this.request<T>({ url, data, headers, method: "POST" });
  }
}

const request = new myRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export default request;
