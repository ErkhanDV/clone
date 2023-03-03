import { type FC } from 'react';
import {
  useAppSelector,
  useGameShipsActions,
  useGetSettedShips,
} from '@/hook/_index';
import { Ship } from '../_index';
import { useTranslation } from 'react-i18next';

import { PERSON } from '@/store/_constants';
import './ShipStation.scss';

const ShipStation: FC = () => {
  const { restShips } = useGetSettedShips();
  const { resetShips, setRandomShips } = useGameShipsActions();
  const { isReady } = useAppSelector((state) => state.gameStateSlice);

  const { t } = useTranslation();

  const resetShipsHandler = () => {
    resetShips();
  };

  if (!isReady) {
    return (
      <div className="ship-station">
        <div className="ship-station_container">
          {restShips.map((decks, i) => (
            <Ship decks={decks} key={i} />
          ))}
        </div>
        <div className="ship-station_discription">
          <button
            className="ship-station_button"
            onClick={() => setRandomShips(PERSON.user, restShips)}
          >
            {t('random')}
          </button>
          <button className="ship-station_button" onClick={resetShipsHandler}>
            {t('reset')}
          </button>
          <p>{t('dragAndDrop')}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default ShipStation;
