import { useEffect } from 'react';

import {
  useAppSelector,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';

import { PERSON } from '@/store/_constants';

import { IShoot } from '@/store/reducers/types/socket';

export const useShootHandler = () => {
  const { setIsAbleShoot } = useGameStateActions();
  const { checkShoot, addNotAllowed } = useGameShipsActions();

  const { userName } = useAppSelector((state) => state.logInSlice);
  const userState = useAppSelector((state) => state.gameShipsSlice.user);
  const rivalState = useAppSelector((state) => state.gameShipsSlice.rival);

  useEffect(() => {
    userState.ships.forEach(async (ship) => {
      if (ship.decks === ship.woundedCells.length) {
        addNotAllowed(PERSON.user, ship.occupiedCells);
      }
    });

    rivalState.ships.forEach(async (ship) => {
      if (ship.decks === ship.woundedCells.length) {
        addNotAllowed(PERSON.rival, ship.occupiedCells);
      }
    });
  }, [userState.ships, rivalState.ships]);

  const shootHandler = ({ user, shoot, isAbleShoot }: IShoot) => {
    if (user === userName) {
      setIsAbleShoot(isAbleShoot);
      checkShoot(PERSON.rival, shoot);
    } else {
      setIsAbleShoot(!isAbleShoot);
      checkShoot(PERSON.user, shoot);
    }
  };

  return { shootHandler };
};
