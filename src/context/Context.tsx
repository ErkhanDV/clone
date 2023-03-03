import { createContext } from 'react';
import { IGameStateContext } from './_types';

export const SocketContext = createContext({} as IGameStateContext);
