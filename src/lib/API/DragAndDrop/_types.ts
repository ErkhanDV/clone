import { DragEvent } from 'react';

import { IAddShip, IShip } from '@/store/reducers/types/shipLocation';

export type IDragHandler = (
  event: DragEvent<HTMLDivElement>,
  horizontalRotation: boolean,
  shipLength: number | null,
  settedShips?: IShip[],
) => void;

export type IDropHandler = (
  event: DragEvent<HTMLDivElement>,
  horizontalRotation: boolean,
  shipLength: number | null,
  callback: (
    ship: IShip,
  ) => {
    payload: IAddShip;
    type: 'gameShips/addShip';
  },
  successfullyDrop: () => {
    payload: boolean;
    type: 'ship/setDropped';
  },
) => void;
