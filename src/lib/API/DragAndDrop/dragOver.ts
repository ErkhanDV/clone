import { isCanDrop } from '../ShipsPlacer/isCanDrop';

import { IDragHandler } from './_types';

export const dragOver: IDragHandler = (
  event,
  horizontalRotation,
  shipLength,
  settedShips,
) => {
  event.preventDefault();
  const notAvailableIndexesRight = [9, 19, 29, 39, 49, 59, 69, 79, 89];
  const notAvailableIndexesLeft = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const parent = target.parentElement;
  const delta1 = 10;
  const delta2 = 20;
  const delta3 = 30;
  if (!horizontalRotation) {
    switch (shipLength) {
      case 1:
        if (settedShips?.length) {
          if (!isCanDrop(settedShips, [targetId])) {
            target.classList.add('red');
            return;
          }
        }
        target.classList.add('green');
        break;
      case 2:
        if (parent && !parent.children[targetId + delta1]) {
          target.classList.add('red');
        }
        if (settedShips?.length) {
          if (
            parent &&
            !isCanDrop(settedShips, [targetId, targetId + delta1])
          ) {
            target.classList.add('red');
            parent.children[targetId + delta1].classList.add('red');
            return;
          }
        }
        if (parent && parent.children[targetId + delta1]) {
          target.classList.add('green');
          parent.children[targetId + delta1].classList.add('green');
        }
        break;
      case 3:
        if (
          parent &&
          !parent.children[targetId + delta1] &&
          !parent.children[targetId + delta2]
        ) {
          target.classList.add('red');
        }
        if (
          parent &&
          parent.children[targetId + delta1] &&
          !parent.children[targetId + delta2]
        ) {
          target.classList.add('red');
          parent.children[targetId + delta1].classList.add('red');
        }
        if (
          parent &&
          !parent.children[targetId + delta1] &&
          parent.children[targetId + delta2]
        ) {
          target.classList.add('red');
          parent.children[targetId + delta2].classList.add('red');
        }
        if (settedShips?.length) {
          if (
            parent &&
            parent.children[targetId + delta1] &&
            parent.children[targetId + delta2] &&
            !isCanDrop(settedShips, [
              targetId,
              targetId + delta1,
              targetId + delta2,
            ])
          ) {
            target.classList.add('red');
            parent.children[targetId + delta1].classList.add('red');
            parent.children[targetId + delta2].classList.add('red');
            return;
          }
        }
        if (
          parent &&
          parent.children[targetId + delta1] &&
          parent.children[targetId + delta2]
        ) {
          target.classList.add('green');
          parent.children[targetId + delta1].classList.add('green');
          parent.children[targetId + delta2].classList.add('green');
        }
        break;
      case 4:
        if (
          parent &&
          !parent.children[targetId + delta1] &&
          !parent.children[targetId + delta2] &&
          !parent.children[targetId + delta3]
        ) {
          target.classList.add('red');
        }
        if (
          parent &&
          parent.children[targetId + delta1] &&
          !parent.children[targetId + delta2] &&
          !parent.children[targetId + delta3]
        ) {
          target.classList.add('red');
          parent.children[targetId + delta1].classList.add('red');
        }
        if (
          parent &&
          parent.children[targetId + delta1] &&
          parent.children[targetId + delta2] &&
          !parent.children[targetId + delta3]
        ) {
          target.classList.add('red');
          parent.children[targetId + delta1].classList.add('red');
          parent.children[targetId + delta2].classList.add('red');
        }
        if (settedShips?.length) {
          if (
            parent &&
            parent.children[targetId + delta1] &&
            parent.children[targetId + delta2] &&
            parent.children[targetId + delta3] &&
            !isCanDrop(settedShips, [
              targetId,
              targetId + delta1,
              targetId + delta2,
              targetId + delta3,
            ])
          ) {
            target.classList.add('red');
            parent.children[targetId + delta1].classList.add('red');
            parent.children[targetId + delta2].classList.add('red');
            parent.children[targetId + delta3].classList.add('red');
            return;
          }
        }
        if (
          parent &&
          parent.children[targetId + delta1] &&
          parent.children[targetId + delta2] &&
          parent.children[targetId + delta3]
        ) {
          target.classList.add('green');
          parent.children[targetId + delta1].classList.add('green');
          parent.children[targetId + delta2].classList.add('green');
          parent.children[targetId + delta3].classList.add('green');
        }
        break;
    }
  } else {
    if (parent) {
      const delta1 = 1;
      const delta2 = -1;
      const delta3 = -2;
      const elements = [
        parent.children[targetId + delta1],
        parent.children[targetId + delta2],
        parent.children[targetId + delta3],
      ];
      switch (shipLength) {
        case 2:
          if (
            (parent && !parent.children[targetId + delta2]) ||
            Math.floor(targetId / 10) !== Math.floor((targetId - 1) / 10)
          ) {
            target.classList.add('red');
            return;
          }
          if (settedShips?.length) {
            if (
              parent &&
              parent.children[targetId + delta2] &&
              !isCanDrop(settedShips, [targetId, targetId + delta2])
            ) {
              target.classList.add('red');
              parent.children[targetId + delta2].classList.add('red');
              return;
            }
          }
          if (parent && parent.children[targetId + delta2]) {
            target.classList.add('green');
            parent.children[targetId + delta2].classList.add('green');
          }
          break;
        case 3:
          if (
            parent &&
            !parent.children[targetId + delta1] &&
            !parent.children[targetId + delta2]
          ) {
            target.classList.add('red');
          }
          if (
            parent &&
            parent.children[targetId + delta1] &&
            !parent.children[targetId + delta2]
          ) {
            target.classList.add('red');
            parent.children[targetId + delta1].classList.add('red');
          }
          if (
            parent &&
            !parent.children[targetId + delta1] &&
            parent.children[targetId + delta2]
          ) {
            target.classList.add('red');
            parent.children[targetId + delta2].classList.add('red');
          }
          if (
            parent &&
            parent.children[targetId + delta1] &&
            parent.children[targetId + delta2] &&
            notAvailableIndexesRight.includes(targetId)
          ) {
            target.classList.add('red');
            parent.children[targetId + delta2].classList.add('red');
          }
          if (
            parent &&
            parent.children[targetId + delta1] &&
            parent.children[targetId + delta2] &&
            notAvailableIndexesLeft.includes(targetId)
          ) {
            target.classList.add('red');
            parent.children[targetId + delta1].classList.add('red');
          }
          if (settedShips?.length) {
            if (
              parent &&
              parent.children[targetId + delta1] &&
              parent.children[targetId + delta2] &&
              !isCanDrop(settedShips, [
                targetId,
                targetId + delta2,
                targetId + delta1,
              ])
            ) {
              target.classList.add('red');
              parent.children[targetId + delta1].classList.add('red');
              parent.children[targetId + delta2].classList.add('red');
              return;
            }
          }
          if (
            parent &&
            parent.children[targetId + delta1] &&
            parent.children[targetId + delta2] &&
            !notAvailableIndexesRight.includes(targetId) &&
            !notAvailableIndexesLeft.includes(targetId)
          ) {
            target.classList.add('green');
            parent.children[targetId + delta1].classList.add('green');
            parent.children[targetId + delta2].classList.add('green');
          }
          break;
        case 4:
          if (notAvailableIndexesRight.includes(targetId)) {
            target.classList.add('red');
            elements
              .filter((element, index) => element && index > 0)
              .forEach((element) => element.classList.add('red'));
          }
          if (
            notAvailableIndexesLeft.includes(targetId) ||
            notAvailableIndexesLeft.includes(targetId - 1)
          ) {
            target.classList.add('red');
            elements
              .filter(
                (element) =>
                  Number(element.id) >= Math.floor(targetId / 10) * 10,
              )
              .forEach((element) => element.classList.add('red'));
          }
          if (!elements.every((element) => element)) {
            target.classList.add('red');
            elements
              .filter((element) => element)
              .forEach((element) => element.classList.add('red'));
          }
          if (settedShips?.length) {
            if (
              parent &&
              parent.children[targetId + delta1] &&
              parent.children[targetId + delta2] &&
              parent.children[targetId + delta3] &&
              !isCanDrop(settedShips, [
                targetId,
                targetId + delta2,
                targetId + delta1,
                targetId + delta3,
              ])
            ) {
              target.classList.add('red');
              parent.children[targetId + delta1].classList.add('red');
              parent.children[targetId + delta2].classList.add('red');
              parent.children[targetId + delta3].classList.add('red');
              return;
            }
          }
          if (
            elements.every((element) => element) &&
            !notAvailableIndexesRight.includes(Number(target.id)) &&
            !notAvailableIndexesLeft.includes(Number(target.id)) &&
            !notAvailableIndexesLeft.includes(Number(target.id) - 1)
          ) {
            target.classList.add('green');
            elements.forEach((element) => element.classList.add('green'));
          }
          break;
      }
    }
  }
};
