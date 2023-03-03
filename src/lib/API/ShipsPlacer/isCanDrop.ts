import { IShip } from '@/store/reducers/types/shipLocation';

export const isCanDrop = (settedShips: IShip[], currentShip: number[]) => {
  return !settedShips.some((ship) => {
    return (
      currentShip.some((coordinate) => {
        return ship.occupiedCells.some((cell) => cell === coordinate);
      }) ||
      currentShip.some((coordinate) => {
        return ship.shipLocation.some((cell) => cell === coordinate);
      })
    );
  });
};
