import { useAppSelector } from '@/hook/_index';
import { useGameShipsActions, useGameStateActions } from '../_index';
import { useComputerTurn } from './use-computer-turn';

import { PERSON } from '@/store/_constants';

import { IPlayerState } from '@/store/reducers/types/shipLocation';

export const useUserTurn = () => {
  const { rival } = useAppSelector((state) => state.gameShipsSlice);
  const { misses, ships, notAllowed } = rival;

  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { computerTurn } = useComputerTurn();
  const { setIsAbleShoot, setWinner } = useGameStateActions();

  const userTurn = (shoot: number) => {
    if (
      !misses.includes(shoot) &&
      !notAllowed.includes(shoot) &&
      !ships.some((ship) => ship.woundedCells.includes(shoot))
    ) {
      checkShoot(PERSON.rival, shoot);
      const cloneRival: IPlayerState = JSON.parse(JSON.stringify(rival));
      const index = ships.findIndex((ship) =>
        ship.shipLocation.includes(shoot),
      );

      if (index !== -1) {
        const ship = cloneRival.ships[index];
        ship.woundedCells.push(shoot);

        if (ship.woundedCells.length === ship.decks) {
          addNotAllowed(PERSON.rival, ship.occupiedCells);
        }
        if (
          cloneRival.ships.filter(
            (ship) => ship.decks === ship.woundedCells.length,
          ).length === 10
        ) {
          setWinner(PERSON.you);
        }
      } else {
        setIsAbleShoot(false);
        computerTurn();
      }
    }
  };

  return { userTurn };
};
