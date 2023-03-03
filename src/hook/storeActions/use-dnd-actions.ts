import { useAppDispatch } from '@/hook/_index';
import * as DnDActions from '@/store/reducers/ShipSlice';
import { ISetShip } from '@/store/reducers/types/ship';

export const useDnDActions = () => {
  const dispatch = useAppDispatch();

  const setShip = (ship: ISetShip) => dispatch(DnDActions.setShip(ship));

  const setDropped = (isDropped: boolean) =>
    dispatch(DnDActions.setDropped(isDropped));

  return {
    setShip,
    setDropped,
  };
};
