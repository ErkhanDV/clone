import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { CLONE_SERVER } from './_constants';
import { ICycleConfig } from './_types';
import { IUser } from './_types';

export const axiosAPI = axios.create({
  withCredentials: true,
  baseURL: CLONE_SERVER,
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
};

const onResponse = (config: AxiosResponse) => {
  return config;
};

const onResponseError = async (error: AxiosError) => {
  const originRequest: ICycleConfig | undefined = error.config;

  if (error.response?.status === 401 && error.config && !originRequest?.isRetry) {
    if (originRequest) {
      originRequest.isRetry = true;
    }

    try {
      const { data } = await axios.get<IUser>(`${CLONE_SERVER}/refresh`, { withCredentials: true });
      localStorage.setItem('token', data.accessToken);
      axiosAPI.request(originRequest as InternalAxiosRequestConfig);
    } catch (error) {
      console.log('Пользователь не авторизован');
    }
  }

  throw error;
};

axiosAPI.interceptors.request.use(onRequest);
axiosAPI.interceptors.response.use(onResponse, onResponseError);
