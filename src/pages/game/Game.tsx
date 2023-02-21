import { useContext, type FC } from 'react';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/Context';
import { Field, RivalField, ShipStation } from '@/components/game/_index';
import { useTranslation } from 'react-i18next';

import './game.scss';

import { SOCKETMETHOD } from '@/services/axios/_constants';
import { PERSON } from '@/store/_constants';

const Game: FC<{ mode: string }> = ({ mode }) => {
  const isOnline = mode === 'online';
  const { socket, sendSocket, init } = useContext(SocketContext);
  const { setIsReady, setIsGameFinded, setIsAbleShoot, setIsStarted } =
    useGameStateActions();
  const { setRandomShips } = useGameShipsActions();

  const { t } = useTranslation();

  const userName = useAppSelector((state) => state.logInSlice.user);
  const { isReady } = useAppSelector((state) => state.gameStateSlice);
  const { gameShipsSlice } = useAppSelector((state) => state);
  const { user } = gameShipsSlice;
  const isFilled = user.shipsLocation.length < 10;

    if (!isOnline) {
      setIsStarted(true);
      setIsGameFinded(true);
      setIsAbleShoot(true);
    }

  const readyHandler = () => {
    setIsReady(true);
    if (isOnline) {
      sendSocket(SOCKETMETHOD.ready, { field: user });
    } else {
      setRandomShips(PERSON.rival);
    }
  };

  const exitHandler = () => {
    sendSocket(SOCKETMETHOD.exit);
  };

  return (
    <div className="game">
      <main className="main">
        {!isReady && (
          <button
            disabled={isFilled}
            onClick={readyHandler}
            className="button-render"
          >
            {isOnline ? 'Ready' : 'Start game'}
          </button>
        )}
        <div className="game_fields">
          <div className="field">
            <h2 className="field_name">{userName}</h2>
            <Field isRival={false} />
          </div>
          <RivalField isOnline={isOnline} />
        </div>
        <ShipStation />
      </main>
    </div>
  );
};

export default Game;
