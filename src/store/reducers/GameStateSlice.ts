import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStartGame } from './types/socket';
import { IGameState } from './types/gameState';

const initialState: IGameState = {
  gameInfo: null,
  opponentName: 'Unknown',
  isGameFinded: false,
  isStarted: false,
  isAbleShoot: false,
  isReady: false,
  opponentIsReady: false,
  winner: '',
  winnerClassList: '',
  gameDifficult: 0,
  status: '',
};

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameInfo(state, action: PayloadAction<IStartGame | null>) {
      state.gameInfo = action.payload;
    },

    setOpponentName(state, action: PayloadAction<string>) {
      state.opponentName = action.payload;
    },

    setGameFinded(state, action: PayloadAction<boolean>) {
      state.isGameFinded = action.payload;
    },

    setStarted(state, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
    },

    setAbleShoot(state, action: PayloadAction<boolean>) {
      state.isAbleShoot = action.payload;
    },

    setReady(state, action: PayloadAction<boolean>) {
      state.isReady = action.payload;
    },

    setOpponentReady(state, action: PayloadAction<boolean>) {
      state.opponentIsReady = action.payload;
    },

    setWinner(state, action: PayloadAction<string>) {
      state.winner = action.payload;
    },

    setWinnerClassList(state, action: PayloadAction<string>) {
      state.winnerClassList = action.payload;
    },

    setGameDifficult(state, action: PayloadAction<number>) {
      state.gameDifficult = action.payload;
    },

    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },

    resetGameState: () => initialState,
  },
});

export const {
  setGameInfo,
  setOpponentName,
  setGameFinded,
  setStarted,
  setAbleShoot,
  setReady,
  setWinner,
  resetGameState,
  setGameDifficult,
  setStatus,
  setWinnerClassList,
  setOpponentReady,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
