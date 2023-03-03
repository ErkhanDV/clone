import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage } from './types/chat';
import { CHAT } from '../_constants';

const initialState: IChat = {
  currentChat: CHAT.common,
  common: [],
  unreadCommon: 0,
  game: [],
  unreadGame: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUnreadCommon(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.unreadCommon = 0;
      } else {
        state.unreadCommon += 1;
      }
    },

    setUnreadGame(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.unreadGame = 0;
      } else {
        state.unreadGame += 1;
      }
    },

    pushGameMessage(state, action: PayloadAction<IChatMessage>) {
      state.game.push(action.payload);
    },

    pushCommonMessage(state, action: PayloadAction<IChatMessage>) {
      state.common.push(action.payload);
    },

    resetGameChat(state) {
      state.game = [];
    },

    resetCommonChat(state) {
      state.common = [];
    },

    changeChat(state, action: PayloadAction<keyof typeof CHAT>) {
      state.currentChat = CHAT[action.payload];
    },
  },
});

export const {
  pushGameMessage,
  pushCommonMessage,
  resetGameChat,
  resetCommonChat,
  changeChat,
  setUnreadCommon,
  setUnreadGame,
} = chatSlice.actions;

export default chatSlice.reducer;
