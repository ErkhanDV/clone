import { type InternalAxiosRequestConfig } from 'axios';

export interface ICycleConfig extends InternalAxiosRequestConfig {
  isRetry?: boolean;
}

export interface IUser {
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export interface IStartGame {
  gameId: string;
  user: IPlayer;
}

export interface IPlayer {
  id: string;
  name: string;
}