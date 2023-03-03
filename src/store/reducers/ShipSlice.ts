import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISetShip, IShipDnD } from './types/ship';

const initialState: IShipDnD = {
  shipDnD: {
    decks: null,
    isHorizontal: false,
  },
  wasDropped: false,
};

const shipSlice = createSlice({
  name: 'ship',
  initialState,
  reducers: {
    setShip(state, action: PayloadAction<ISetShip>) {
      state.shipDnD.decks = action.payload.decks;
      state.shipDnD.isHorizontal = action.payload.isHorizontal;
    },

    setDropped(state, action: PayloadAction<boolean>) {
      state.wasDropped = action.payload;
    },
  },
});

export const { setShip, setDropped } = shipSlice.actions;
export default shipSlice.reducer;
