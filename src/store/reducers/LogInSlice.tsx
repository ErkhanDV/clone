import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MODAL } from '../_constants';
import { ILogIn } from './types/logIn';

const initialState: ILogIn = {
  userName: '',
  isAuthorized: false,
  isModalOpen: false,
  modalChildren: MODAL.log,
  onlinePlayers: 0,
  onlineNames: [],
};

const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
      state.isAuthorized = !!state.userName;
    },

    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },

    setModalChildren(state, action: PayloadAction<string>) {
      state.modalChildren = action.payload;
    },

    setOnlinePlayers(state, action: PayloadAction<number>) {
      state.onlinePlayers = action.payload;
    },

    setOnlineNames(state, action: PayloadAction<string[]>) {
      state.onlineNames = action.payload;
    },
  },
});

export const {
  setUserName,
  setModalOpen,
  setModalChildren,
  setOnlinePlayers,
  setOnlineNames,
} = logInSlice.actions;

export default logInSlice.reducer;
