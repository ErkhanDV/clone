import * as AIStateSlice from '@/store/reducers/AIState';
import { useAppDispatch } from '../use-redux';

export const useAIState = () => {
  const dispatch = useAppDispatch();

  const setAvailableShoots = (cells: number[]) =>
    dispatch(AIStateSlice.setAvailableShoots(cells));

  const setTurnToDestroy = (amount: number) =>
    dispatch(AIStateSlice.setTurnToDestroy(amount));

  const setHitted = (index: number) => dispatch(AIStateSlice.setHitted(index));

  return {
    setAvailableShoots,
    setTurnToDestroy,
    setHitted,
  };
};
