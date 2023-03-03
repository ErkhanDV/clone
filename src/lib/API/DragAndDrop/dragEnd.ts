import { IDragHandler } from './_types';

export const dragEnd: IDragHandler = (
  event,
  horizontalRotation,
  shipLength,
) => {
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const parent = target.parentElement as HTMLDivElement;
  const delta1 = !horizontalRotation ? 10 : 1;
  const delta2 = !horizontalRotation ? 20 : -1;
  const delta3 = !horizontalRotation ? 30 : -2;
  const children = parent.children;
  switch (shipLength) {
    case 1:
      target.classList.remove('green');
      target.classList.remove('red');
      break;
    case 2:
      target.classList.remove('green', 'red');
      if (parent.childNodes[targetId + delta1]) {
        children[targetId + delta1].classList.remove('green', 'red');
      }
      if (parent.childNodes[targetId + delta2]) {
        children[targetId + delta2].classList.remove('green', 'red');
      }
      break;
    case 3:
      target.classList.remove('green', 'red');
      const neighbor1 = children[targetId + delta1] as HTMLDivElement;
      const neighbor2 = children[targetId + delta2] as HTMLDivElement;
      if (neighbor1) {
        neighbor1.classList.remove('green', 'red');
      }
      if (neighbor2) {
        neighbor2.classList.remove('green', 'red');
      }
      break;
    case 4:
      target.classList.remove('green', 'red');
      if (children[targetId + delta1]) {
        children[targetId + delta1].classList.remove('green', 'red');
      }
      if (children[targetId + delta2]) {
        children[targetId + delta2].classList.remove('green', 'red');
      }
      if (children[targetId + delta3]) {
        children[targetId + delta3].classList.remove('green', 'red');
      }
      break;
  }
};
