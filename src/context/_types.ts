import { IStartGame } from '@/services/axios/_types';
import { IPlayerState } from '@/store/reducers/types/shipLocation';
import { Dispatch, SetStateAction } from 'react';
import { TSendData } from '@/store/reducers/types/socket';
export interface IGameStateContext {
  socket: WebSocket;
  sendSocket: ((method: string, data?: TSendData) => void) | undefined;
 }
