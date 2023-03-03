import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInviteState } from './types/inviteState';

const initialState: IInviteState = {
  invite: '',
  inviteValidation: '',
  inviteInProgress: false,
  inviteTo: '',
};

export const inviteStateSlice = createSlice({
  name: 'inviteState',
  initialState,
  reducers: {
    setInvite(state, action: PayloadAction<string>) {
      state.invite = action.payload;
    },

    setInviteTo(state, action: PayloadAction<string>) {
      state.inviteTo = action.payload;
    },

    setInviteValidation(state, action: PayloadAction<string>) {
      state.inviteValidation = action.payload;
    },

    setInviteInProgress(state, action: PayloadAction<boolean>) {
      state.inviteInProgress = action.payload;
    },

    resetInviteState: () => initialState,
  },
});

export const {
  setInvite,
  setInviteTo,
  setInviteValidation,
  setInviteInProgress,
  resetInviteState,
} = inviteStateSlice.actions;

export default inviteStateSlice.reducer;
