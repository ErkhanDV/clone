import axios, { AxiosError } from 'axios';
import { axiosAPI } from './_interceptors';
import { IUser } from './_types';
import { STATUS, CLONE_SERVER } from './_constants';

export class authService {
  static async login(name: string): Promise<IUser> {
    try {
      const { status, data } = await axiosAPI.post<IUser>('/login', { name });

      if (status === STATUS.ok && data) {
        localStorage.setItem('token', data.accessToken);
        return data;
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, message } = error.response.data;
        console.log(`status: ${status}; error: ${message}`);
        return message;
      }
      console.log(error);
    }
    return { id: '', name: '', refreshToken: '', accessToken: '' };
  }

  static async logout(): Promise<boolean | undefined> {
    try {
      const { status } = await axiosAPI.delete('/logout');
      if (status === STATUS.ok) {
        localStorage.removeItem('token');
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, message } = error.response.data;
        console.log(`status: ${status}; error: ${message}`);
        return message;
      }
      console.log(error);
    }
  }

  static async checkAuth(): Promise<IUser | undefined> {
    try {
      const { data } = await axios.get<IUser>(`${CLONE_SERVER}/refresh`, {
        withCredentials: true,
      });
      if (data) {
        localStorage.setItem('token', data.accessToken);
        return data;
      }
      localStorage.removeItem('token');
      return undefined;
    } catch (error) {
      localStorage.removeItem('token');
      if (error instanceof AxiosError && error.response) {
        const { status, message } = error.response.data;
        console.log(`status: ${status}; error: ${message}`);
        return undefined;
      }
      console.log(error);
    }
  }
}
