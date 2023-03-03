import { getRandomNum } from '@/lib/utils/getRandomNum';

import { PERSON } from '@/store/_constants';

import { IGameShips, IPlayerState } from '@/store/reducers/types/shipLocation';

export const getPossibleCells = (
  shoots: number[],
  notAllowed: number[],
  misses: number[],
) => {
  const possibleCells = [];

  if (shoots.length === 1) {
    const shoot = shoots[0];

    if (shoot > 9) {
      possibleCells.push(shoot - 10);
    }

    if (shoot < 90) {
      possibleCells.push(shoot + 10);
    }

    if (Math.floor((shoot - 1) / 10) === Math.floor(shoot / 10)) {
      possibleCells.push(shoot - 1);
    }

    if (Math.floor((shoot + 1) / 10) === Math.floor(shoot / 10)) {
      possibleCells.push(shoot + 1);
    }
  } else {
    const sortedShoots = [...shoots].sort((a, b) => a - b);
    const tail = sortedShoots[0];
    const head = sortedShoots[sortedShoots.length - 1];

    if (Math.abs(shoots[0] - shoots[1]) === 1) {
      if (Math.floor((tail - 1) / 10) === Math.floor(tail / 10)) {
        possibleCells.push(tail - 1);
      }

      if (Math.floor((head + 1) / 10) === Math.floor(head / 10)) {
        possibleCells.push(head + 1);
      }
    } else if (Math.abs(shoots[0] - shoots[1]) === 10) {
      if (tail > 9) {
        possibleCells.push(tail - 10);
      }

      if (head < 90) {
        possibleCells.push(head + 10);
      }
    }
  }

  return possibleCells
    .filter(
      (cell) =>
        !notAllowed.includes(cell) &&
        !misses.includes(cell) &&
        !shoots.includes(cell),
    )
    .sort((a, b) => a - b);
};

const getShootTarget = (availableShoots: number[]): number => {
  const index = getRandomNum(0, availableShoots.length - 1);
  return availableShoots[index];
};

const changeAvailableShoots = (availableShoots: number[], shoot: number) => {
  return availableShoots.filter((target) => target !== shoot);
};

export const computerMove = (
  user: IPlayerState,
  shoot: number,
  availableCells: number[],
  hitted: number,
  turnToDestroy: number,
  gameDifficult: number,
  addNotAllowed: (
    person: keyof IGameShips,
    notAllowed: number[],
  ) => void,
  setIsAbleShoot: (state: boolean) => void,
  checkShoot: (person: keyof IGameShips, cell: number) => void,
  setAvailableShoots: (cells: number[]) => {
    payload: number[];
    type: 'AIState/setAvailableShoots';
  },
  setHitted: (index: number) => {
    payload: number;
    type: 'AIState/setHitted';
  },
  setTurnToDestroy: (amount: number) => {
    payload: number;
    type: 'AIState/setTurnToDestroy';
  },
  setWinner: (name: string) => {
    payload: string;
    type: 'gameState/setWinner';
  },
) => {
  const cloneUser: IPlayerState = JSON.parse(JSON.stringify(user));
  const shipIndex = cloneUser.ships.findIndex((ship) =>
    ship.shipLocation.includes(shoot),
  );
  if (shipIndex === -1) {
    if (hitted !== -1) {
      setTurnToDestroy(turnToDestroy + 1);
    }
    setIsAbleShoot(true);
    setAvailableShoots(changeAvailableShoots(availableCells, shoot));
    checkShoot(PERSON.user, shoot);
    return;
  }

  const ship = cloneUser.ships[shipIndex];
  cloneUser.ships[shipIndex].woundedCells.push(shoot);
  const updatedAvailableCells = availableCells.filter(
    (cell) => !ship.occupiedCells.includes(cell) && cell !== shoot,
  );
  setHitted(shipIndex);
  checkShoot(PERSON.user, shoot);

  if (ship.decks === ship.woundedCells.length) {
    setHitted(-1);
    setTurnToDestroy(0);
    addNotAllowed(PERSON.user, ship.occupiedCells);
    cloneUser.notAllowed.push(...ship.occupiedCells);
    if (
      cloneUser.ships.filter((ship) => ship.decks === ship.woundedCells.length)
        .length === 10
    ) {
      setWinner(PERSON.computer);
      return;
    }
    const newShoot = getShootTarget(updatedAvailableCells);
    setTimeout(() => {
      computerMove(
        cloneUser,
        newShoot,
        updatedAvailableCells,
        -1,
        0,
        gameDifficult,
        addNotAllowed,
        setIsAbleShoot,
        checkShoot,
        setAvailableShoots,
        setHitted,
        setTurnToDestroy,
        setWinner,
      );
    }, 500);
  } else {
    if (ship.woundedCells.length === 1) {
      const newShoot =
        gameDifficult === 2
          ? ship.shipLocation.filter(
              (cell) => !ship.woundedCells.includes(cell),
            )[0]
          : getPossibleCells(
              [shoot],
              cloneUser.notAllowed,
              cloneUser.misses,
            )[0];
      const hitted = shipIndex;
      setTimeout(() => {
        computerMove(
          cloneUser,
          newShoot,
          updatedAvailableCells,
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
      }, 500);
    } else if (ship.woundedCells.length > 1) {
      const availableShoots =
        gameDifficult === 2
          ? ship.shipLocation.filter(
              (cell) => !ship.woundedCells.includes(cell),
            )
          : getPossibleCells(
              ship.woundedCells,
              cloneUser.notAllowed,
              cloneUser.misses,
            );
      setTimeout(() => {
        computerMove(
          cloneUser,
          availableShoots[0],
          updatedAvailableCells,
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
      }, 500);
    }
  }
};
