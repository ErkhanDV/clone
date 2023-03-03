import { useTranslation } from 'react-i18next';

import {
  useAppSelector,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';

import { PERSON } from '@/store/_constants';
import { IReady } from '@/store/reducers/types/socket';

export const useReadyHandler = () => {
  const { t } = useTranslation();
  const { setIsStarted, setStatus, setOpponentReady } = useGameStateActions();
  const { updateShipsLocationState } = useGameShipsActions();
  const { userName } = useAppSelector((state) => state.logInSlice);

  const readyHandler = ({ isStarted, field, user }: IReady) => {
    setIsStarted(isStarted);

    if (isStarted) {
      setStatus(t('gameStart'));

      setTimeout(() => {
        setStatus('');
      }, 2000);
    }

    if (user !== userName) {
      setOpponentReady(true);
      updateShipsLocationState(field, PERSON.rival);
    } else {
      updateShipsLocationState(field, PERSON.user);
    }
  };

  return { readyHandler };
};
