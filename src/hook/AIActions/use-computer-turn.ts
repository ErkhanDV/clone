import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
  useAIState,
} from '@/hook/_index';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { computerMove, getPossibleCells } from './computerMove';

export const useComputerTurn = () => {
  const { user } = useAppSelector((state) => state.gameShipsSlice);
  const { gameDifficult } = useAppSelector((state) => state.gameStateSlice);

  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot, setWinner } = useGameStateActions();
  const { availableShoots, turnToDestroy, hitted } = useAppSelector(
    (state) => state.AIStateSlice,
  );
  const { setAvailableShoots, setTurnToDestroy, setHitted } = useAIState();

  const getShootTarget = (): number => {
    const index = getRandomNum(0, availableShoots.length - 1);
    return availableShoots[index];
  };
  const computerTurn = () => {
    const getShoot = () => {
      if (turnToDestroy !== 0) {
        return getPossibleCells(
          user.ships[hitted].woundedCells,
          user.notAllowed,
          user.misses,
        )[0];
      }
      return getShootTarget();
    };

    const shoot = getShoot();

    setTimeout(() => {
      computerMove(
        user,
        shoot,
        availableShoots,
        hitted,
        turnToDestroy,
        gameDifficult,
        addNotAllowed,
        setIsAbleShoot,
        checkShoot,
        setAvailableShoots,
        setHitted,
        setTurnToDestroy,
        setWinner,
      );
    }, 2500);
  };

  return { computerTurn };
};
