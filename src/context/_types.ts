import { TSendData } from '@/store/reducers/types/socket';
export interface IGameStateContext {
  sendSocket: <T extends TSendData>(method: string, data?: T) => void;
}
