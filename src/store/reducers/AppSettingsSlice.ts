import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAppSettings } from './types/appSettings';

const initialState: IAppSettings = {
  theme: 'dark',
  scheme: 'green',
  sound: true,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },

    changeScheme(state, action: PayloadAction<string>) {
      state.scheme = action.payload;
    },

    toggleSound(state, action: PayloadAction<boolean>) {
      state.sound = action.payload;
    },
  },
});

export const { changeTheme, changeScheme, toggleSound } =
  appSettingsSlice.actions;
export default appSettingsSlice.reducer;
