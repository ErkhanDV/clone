import { IPlayerState } from './shipLocation';
import { IPlayer, IStartGame } from '@/services/axios/_types';
import { IChatMessage } from './chat';

export interface IConnect {
  method: string;
  isGameFinded: boolean;
  isAbleShoot: boolean;
  isReconnect: boolean;
  isStarted: boolean;
  field?: IPlayerState;
  opponentName?: string;
  opponentField?: IPlayerState;
}

export interface IReady {
  user: string;
  isStarted: boolean;
  field: IPlayerState;
}

export interface IShoot {
  user: string;
  shoot: number;
  isAbleShoot: boolean;
  winner?: string;
}

export interface IExit {
  user: string;
}

export interface IMessage {
  mail: IChatMessage;
}

export interface IMailing {
  chatName: string;
  chatMessage: IChatMessage[];
}

export interface IInvite {
  friend: string;
  server: string;
  isFinded: boolean;
  isDeclined?: boolean;
  isAproved?: boolean;
}

export interface IOnline {
  count: number;
  names: string[];
}

export interface ISendConnect {
  gameId: string;
  user: IPlayer;
}

export interface ISendReady {
  field: IPlayerState;
}

export interface ISendShoot {
  shoot: number;
}

export interface ISendChat {
  mail: IChatMessage;
}

export interface ISendSocketName {
  socketName: string;
}

export interface ISendInvite {
  server: string;
  friend: string;
  isDeclined?: boolean;
  isAproved?: boolean;
}

export type TSendData =
  | ISendConnect
  | ISendReady
  | ISendShoot
  | ISendChat
  | ISendSocketName
  | ISendInvite;

export type TSocketMessage = IStartGame &
  IReady &
  IConnect &
  IShoot &
  IMessage &
  IMailing &
  IExit &
  IInvite &
  IOnline;

export type TSendSocket = <T extends TSendData>(
  method: string,
  data?: T,
) => void;

export { type IStartGame };
