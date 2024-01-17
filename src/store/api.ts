import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';

const BASE_URL = 'https://13.design.pages.academy/wtw';
const TIMEOUT = 5000;

const errorCodes = new Set([
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND,
  StatusCodes.BAD_REQUEST
]);

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
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && !errorCodes.has(error.response.status)) {
        toast.error('Request error');
      }

      throw error;
    }
  );

  return api;
}
