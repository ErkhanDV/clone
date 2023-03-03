import { getOccupiedCells } from '../ShipsPlacer/ShipsPlacer';
import { IDropHandler } from './_types';

export const drop: IDropHandler = (
  event,
  horizontalRotation,
  shipLength,
  callback,
  succesfullyDrop,
) => {
  event.preventDefault();
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const parent = target.parentElement as HTMLDivElement;
  const children = parent.children;
  if (!horizontalRotation) {
    switch (shipLength) {
      case 1:
        if (target.classList.contains('green')) {
          target.classList.remove('green', 'red');
          callback({
            shipLocation: [targetId],
            decks: 1,
            occupiedCells: getOccupiedCells([targetId]),
            woundedCells: [],
          });
          succesfullyDrop();
        } else {
          target.classList.remove('green', 'red');
        }
        break;
      case 2:
        if (
          children[targetId + 10] &&
          children[targetId].classList.contains('green') &&
          children[targetId + 10].classList.contains('green')
        ) {
          children[targetId].classList.remove('green');
          children[targetId + 10].classList.remove('green');
          callback({
            shipLocation: [targetId, targetId + 10],
            decks: 2,
            occupiedCells: getOccupiedCells([targetId, targetId + 10]),
            woundedCells: [],
          });
          succesfullyDrop();
        } else {
          target.classList.remove('green', 'red');
          if (parent.children[targetId + 10]) {
            parent.children[targetId + 10].classList.remove('green', 'red');
          }
          return;
        }
        break;
      case 3:
        if (
          children[targetId + 10] &&
          children[targetId + 20] &&
          children[targetId].classList.contains('green') &&
          children[targetId + 10].classList.contains('green') &&
          children[targetId + 20].classList.contains('green')
        ) {
          children[targetId].classList.remove('green');
          children[targetId + 10].classList.remove('green');
          children[targetId + 20].classList.remove('green');
          callback({
            shipLocation: [targetId, targetId + 10, targetId + 20],
            decks: 3,
            occupiedCells: getOccupiedCells([
              targetId,
              targetId + 10,
              targetId + 20,
            ]),
            woundedCells: [],
          });
          succesfullyDrop();
        } else {
          target.classList.remove('green', 'red');
          if (parent.children[targetId + 10]) {
            parent.children[targetId + 10].classList.remove('green', 'red');
          }
          if (parent.children[targetId + 20]) {
            parent.children[targetId + 20].classList.remove('green', 'red');
          }
          return;
        }
        break;
      case 4:
        if (
          children[targetId + 10] &&
          children[targetId + 20] &&
          children[targetId + 30] &&
          children[targetId].classList.contains('green') &&
          children[targetId + 10].classList.contains('green') &&
          children[targetId + 20].classList.contains('green') &&
          children[targetId + 30].classList.contains('green')
        ) {
          children[targetId].classList.remove('green');
          children[targetId + 10].classList.remove('green');
          children[targetId + 20].classList.remove('green');
          children[targetId + 30].classList.remove('green');
          callback({
            shipLocation: [
              targetId,
              targetId + 10,
              targetId + 20,
              targetId + 30,
            ],
            decks: 4,
            occupiedCells: getOccupiedCells([
              targetId,
              targetId + 10,
              targetId + 20,
              targetId + 30,
            ]),
            woundedCells: [],
          });
          succesfullyDrop();
        } else {
          target.classList.remove('green', 'red');
          if (parent.children[targetId + 10]) {
            parent.children[targetId + 10].classList.remove('green', 'red');
          }
          if (parent.children[targetId + 20]) {
            parent.children[targetId + 20].classList.remove('green', 'red');
          }
          if (parent.children[targetId + 30]) {
            parent.children[targetId + 30].classList.remove('green', 'red');
          }
          return;
        }
        break;
    }
  } else {
    const notAvailableIndexesRight = [9, 19, 29, 39, 49, 59, 69, 79, 89];
    const notAvailableIndexesLeft = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    switch (shipLength) {
      case 2:
        if (
          notAvailableIndexesRight.includes(targetId) ||
          notAvailableIndexesLeft.includes(targetId)
        ) {
          children[targetId].classList.remove('red');
          children[targetId - 1].classList.remove('red');
        }
        if (
          children[targetId].classList.contains('green') &&
          children[targetId - 1].classList.contains('green')
        ) {
          children[targetId].classList.remove('green');
          children[targetId - 1].classList.remove('green');
          callback({
            shipLocation: [targetId, targetId - 1],
            decks: 2,
            occupiedCells: getOccupiedCells([targetId, targetId - 1]),
            woundedCells: [],
          });
          succesfullyDrop();
        } else {
          target.classList.remove('green', 'red');
          if (parent.children[targetId - 1]) {
            parent.children[targetId - 1].classList.remove('green', 'red');
          }
          return;
        }
        break;
      case 3:
        if (
          notAvailableIndexesRight.includes(targetId) ||
          notAvailableIndexesLeft.includes(targetId)
        ) {
          children[targetId].classList.remove('red');
          children[targetId + 1].classList.remove('red');
          children[targetId - 1].classList.remove('red');
          return;
        } else if (
          children[targetId + 1] &&
          children[targetId - 1] &&
          children[targetId].classList.contains('green') &&
          children[targetId + 1].classList.contains('green') &&
          children[targetId - 1].classList.contains('green')
        ) {
          children[targetId].classList.remove('green');
          children[targetId + 1].classList.remove('green');
          children[targetId - 1].classList.remove('green');
          callback({
            shipLocation: [targetId, targetId + 1, targetId - 1],
            decks: 3,
            occupiedCells: getOccupiedCells([
              targetId,
              targetId + 1,
              targetId - 1,
            ]),
            woundedCells: [],
          });
          succesfullyDrop();
        } else {
          target.classList.remove('green', 'red');
          if (parent.children[targetId + 1]) {
            parent.children[targetId + 1].classList.remove('green', 'red');
          }
          if (parent.children[targetId - 1]) {
            parent.children[targetId - 1].classList.remove('green', 'red');
          }
          return;
        }
        break;
      case 4:
        if (
          notAvailableIndexesRight.includes(targetId) ||
          notAvailableIndexesLeft.includes(targetId)
        ) {
          children[targetId].classList.remove('red');
          children[targetId + 1].classList.remove('red');
          children[targetId - 1].classList.remove('red');
          children[targetId - 2].classList.remove('red');
          return;
        } else if (
          children[targetId + 1] &&
          children[targetId - 1] &&
          children[targetId - 2] &&
          Math.floor((targetId - 2) / 10) === Math.floor(targetId / 10) &&
          children[targetId].classList.contains('green') &&
          children[targetId + 1].classList.contains('green') &&
          children[targetId - 1].classList.contains('green') &&
          children[targetId - 2].classList.contains('green')
        ) {
          children[targetId].classList.remove('green');
          children[targetId + 1].classList.remove('green');
          children[targetId - 1].classList.remove('green');
          children[targetId - 2].classList.remove('green');
          callback({
            shipLocation: [targetId, targetId + 1, targetId - 1, targetId - 2],
            decks: 4,
            occupiedCells: getOccupiedCells([
              targetId,
              targetId + 1,
              targetId - 1,
              targetId - 2,
            ]),
            woundedCells: [],
          });
          succesfullyDrop();
        } else {
          target.classList.remove('green', 'red');
          if (parent.children[targetId + 1]) {
            parent.children[targetId + 1].classList.remove('green', 'red');
          }
          if (parent.children[targetId - 1]) {
            parent.children[targetId - 1].classList.remove('green', 'red');
          }
          if (parent.children[targetId - 2]) {
            parent.children[targetId - 2].classList.remove('green', 'red');
          }
          return;
        }
        break;
    }
  }
};
