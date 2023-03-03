import { IShip } from '@/store/reducers/types/shipLocation';

export const checkShootIndex = (rivalShips: IShip[], targetId: number) => {
  return rivalShips.findIndex((ship) => ship.shipLocation.includes(targetId));
};
