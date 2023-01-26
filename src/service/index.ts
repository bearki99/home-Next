import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";


const TIME_OUT = 1000 * 8;
const BASE_URL = "http://47.96.134.75:3000/"; //服务器地址，现在为mock的服务器地址


class myRequest {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    // 全局拦截器
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    });

    this.instance.interceptors.response.use((res: AxiosResponse) => {
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

export const testRequest = new myRequest({
  baseURL: "https://mock.apifox.cn/m1/2202148-0-default",
  timeout: TIME_OUT,
});

