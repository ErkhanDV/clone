export interface IChat {
  currentChat: string;
  common: IChatMessage[];
  game: IChatMessage[];
  unreadGame: number;
  unreadCommon: number;
}

export interface IChatMessage {
  name: string;
  date: string;
  text: string;
  gameId?: string;
  chatName: string;
  setDate?: boolean;
}
