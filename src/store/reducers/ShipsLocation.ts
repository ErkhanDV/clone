import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShipsLocation, ShipCoordinates } from '@/store/types/_types';

const initialState: IShipsLocation = {
  shipsLocation: [],
};

const shipsLocation = createSlice({
  name: 'shipsLocation',
  initialState,
  reducers: {
    setShipsLocation(state, action: PayloadAction<ShipCoordinates>) {
      state.shipsLocation.push(action.payload);
    },
  },
});

export const { setShipsLocation } = shipsLocation.actions;
export default shipsLocation.reducer;
