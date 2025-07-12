import { BACKEND_URL, REQUEST_API_TIMEOUT } from '@/const';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { getLocalStore } from '@/store/local';
import { checkAuth } from '../lib';

const createApi = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_API_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { token, authStatus } = getLocalStore();
    if (token && checkAuth(authStatus)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  /**
   * TODO: както реагировать на 403 ответ от сервера
   * такое может быть если админ решит забанить пользователя
   */

  return api;
};

export const api = createApi();
