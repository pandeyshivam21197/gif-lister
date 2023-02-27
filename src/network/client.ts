import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import {responseInterceptors} from './interceptors';

class ApiClient {
  apiclient: AxiosInstance;

  constructor() {
    let axiosInstance = axios.create({
      baseURL: 'https://dummyjson.com/',
      timeout: 600000,
    });

    const {onRejected, onResponse} = responseInterceptors();

    axiosInstance.interceptors.response.use(onResponse, onRejected);

    this.apiclient = axiosInstance;
  }

  request = async (config: AxiosRequestConfig): Promise<any> => {
    try {
      const res = await this.apiclient?.request(config);
      return res;
    } catch (e) {}
  };

  get = (url: string, params = {}): any => {
    return this.request({
      method: 'GET',
      url,
      params,
    });
  };
}

const apiClient = new ApiClient();

export {apiClient as ApiClient};
