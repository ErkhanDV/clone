import { useContext, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Chat, Status } from '@/components/_index';

import './Game.scss';

import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';
import {
  Field,
  RivalField,
  ShipStation,
  Gameover,
} from '@/components/game/_index';
import { useComputerTurn } from '@/hook/AIActions/use-computer-turn';

import { SOCKETMETHOD } from '@/services/axios/_constants';
import { GAMEDIFFICULTS, PERSON } from '@/store/_constants';
import { GAMEMODE } from '@/router/_constants';

const Game: FC<{ mode: string }> = ({ mode }) => {
  const { sendSocket } = useContext(SocketContext);
  const { t } = useTranslation();
  const { setRandomShips } = useGameShipsActions();
  const {
    setIsReady,
    // setIsGameFinded,
    setIsAbleShoot,
    setIsStarted,
    setGameDifficult,
  } = useGameStateActions();
  const { computerTurn } = useComputerTurn();

  const { userName, isReady, user, gameDifficult } = useAppSelector((state) => {
    const { userName } = state.logInSlice;
    const { isReady, gameDifficult } = state.gameStateSlice;
    const { user } = state.gameShipsSlice;

    return { userName, isReady, gameDifficult, user };
  });

  const [isOnline, setIsOnline] = useState(false);
  const isFilled = user.ships.length < 10;

  useEffect(() => {
    setIsOnline(mode === GAMEMODE.MP ? true : false);
  }, [mode]);

  // useEffect(() => {
  //   if (!isOnline) {
  //     setIsGameFinded(true);
  //   }
  // });

  const readyHandler = () => {
    setIsReady(true);
    if (isOnline) {
      sendSocket(SOCKETMETHOD.ready, { field: user });
    } else {
      setIsStarted(true);
      setRandomShips(PERSON.rival);
      if (gameDifficult && gameDifficult > 1) {
        computerTurn();
      } else {
        setIsAbleShoot(true);
      }
    }
  };

  const gameDifficultHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameDifficult(Number(e.target.value));
  };

  return (
    <div className="game">
      <main className="main">
        <div className="game_control">
          {!isReady && !isOnline ? (
            <div className="game_difficult">
              <select
                className="game_select"
                name="difficult"
                id="difficult"
                onChange={(e) => gameDifficultHandler(e)}
              >
                {GAMEDIFFICULTS.map((difficult, i) => (
                  <option value={i} key={i}>
                    {difficult}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {!isReady ? (
            <button
              disabled={isFilled || (!isOnline && !gameDifficult)}
              onClick={readyHandler}
              className="button-render"
            >
              {isOnline ? t(GAMEMODE.ready) : t(GAMEMODE.start)}
            </button>
          ) : null}
        </div>
        <div className="game_fields">
          <div className="field">
            <h2 className="field_name">{userName || PERSON.you}</h2>
            <Field isRival={false} isOnline={isOnline} />
          </div>
          <ShipStation />
          <RivalField isOnline={isOnline} />
          <Gameover isOnline={isOnline} />
          <Status />
        </div>
      </main>
      <Chat />
    </div>
  );
};

export default Game;
