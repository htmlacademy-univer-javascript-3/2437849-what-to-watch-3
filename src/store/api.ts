import axios, {AxiosRequestConfig} from 'axios';
import {getToken} from './token';

export const BASE_URL = 'https://13.design.pages.academy/wtw';
export const TIMEOUT = 5000;

export function createAPI() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  return api;
}
