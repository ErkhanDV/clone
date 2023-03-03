import { useAppDispatch } from '@/hook/_index';
import * as gameStateActions from '@/store/reducers/GameStateSlice';
import { IStartGame } from '@/store/reducers/types/socket';

export const useGameStateActions = () => {
  const dispatch = useAppDispatch();

  const setGameInfo = (info: IStartGame | null) =>
    dispatch(gameStateActions.setGameInfo(info));

  const setOpponentName = (name: string) =>
    dispatch(gameStateActions.setOpponentName(name));

  const setIsReady = (state: boolean) =>
    dispatch(gameStateActions.setReady(state));

  const setOpponentReady = (state: boolean) => {
    dispatch(gameStateActions.setOpponentReady(state));
  };

  const setIsAbleShoot = (state: boolean) => {
    dispatch(gameStateActions.setAbleShoot(state));
  };

  const setIsGameFinded = (state: boolean) =>
    dispatch(gameStateActions.setGameFinded(state));

  const setIsStarted = (state: boolean) =>
    dispatch(gameStateActions.setStarted(state));

  const setWinner = (name: string) =>
    dispatch(gameStateActions.setWinner(name));

  const resetGameState = () => dispatch(gameStateActions.resetGameState());

  const setGameDifficult = (difficult: number) =>
    dispatch(gameStateActions.setGameDifficult(difficult));

  const setStatus = (status: string) =>
    dispatch(gameStateActions.setStatus(status));

  const setClassList = (classList: string) =>
    dispatch(gameStateActions.setWinnerClassList(classList));

  return {
    setWinner,
    setGameInfo,
    setOpponentName,
    setIsReady,
    setOpponentReady,
    setIsAbleShoot,
    setIsGameFinded,
    setIsStarted,
    resetGameState,
    setGameDifficult,
    setStatus,
    setClassList,
  };
};
