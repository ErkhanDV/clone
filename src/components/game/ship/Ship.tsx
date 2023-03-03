import { FC, useEffect, useState } from 'react';
import { useAppSelector, useDnDActions } from '@/hook/_index';
import { ISetShip } from '@/store/reducers/types/ship';
import { DECKS } from './_constants';

import './Ship.scss';

const Ship: FC<{ decks: number }> = ({ decks }) => {
  const { setDropped, setShip } = useDnDActions();

  const [isHorizontal, setHorizonal] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const { wasDropped } = useAppSelector((state) => state.shipSlice);

  const setShipHandler = (currentShip: ISetShip) => {
    setShip(currentShip);
  };

  const setNotDrop = () => setDropped(false);

  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    isHorizontal: boolean,
  ) => {
    const target = event.target as HTMLDivElement;
    const decks = target.childNodes.length;
    setShipHandler({ decks, isHorizontal });
  };

  const dragEndHandler = () => {
    setShipHandler({ decks: null, isHorizontal: false });
    if (wasDropped) {
      setNotDrop();
    }
  };

  const rotateHandler = (decks: number) => {
    if (decks > 1) {
      setClickCount(clickCount + 1);
      setTimeout(() => {
        setClickCount(0);
      }, 400);
    }
  };

  useEffect(() => {
    if (clickCount === 2) {
      setHorizonal(!isHorizontal);
    }
  }, [clickCount]);

  const getDeckClass = (decks: number) => {
    const { one, two, three, four } = DECKS;
    switch (decks) {
      case 1:
        return one;
      case 2:
        return two;
      case 3:
        return three;
      case 4:
        return four;
      default:
        return '';
    }
  };

  const classList = ['ship', getDeckClass(decks)];

  return (
    <div
      className={`${classList.join(' ')}${isHorizontal ? ' horizontal' : ''}`}
      draggable={true}
      onClick={() => rotateHandler(decks)}
      onDragStart={(event) => {
        dragStartHandler(event, isHorizontal);
      }}
      onDragEnd={() => {
        dragEndHandler();
      }}
    >
      {new Array(decks).fill(null).map((_, index) => (
        <div className="ship-cell" key={index}></div>
      ))}
    </div>
  );
};

export default Ship;
