import { IStartGame } from '@/services/axios/_types';
import { IPlayerState } from '@/store/reducers/types/shipLocation';
import { Dispatch, SetStateAction } from 'react';

export interface IGameStateContext {
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  sendSocket: ((
    method: string,
    data?: { field: IPlayerState } | { shoot: number },
  ) => void) | undefined;
  init: (response: IStartGame) => void;
}
