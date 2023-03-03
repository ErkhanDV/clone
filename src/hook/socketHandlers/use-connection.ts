import { useTranslation } from 'react-i18next';
import {
  useAppSelector,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';
import { PERSON } from '@/store/_constants';
import { IStartGame, IConnect } from '@/store/reducers/types/socket';

export const useConnectionHandler = () => {
  const { t } = useTranslation();
  const {
    setIsAbleShoot,
    setIsGameFinded,
    setIsReady,
    setIsStarted,
    setOpponentName,
    setStatus,
  } = useGameStateActions();
  const { updateShipsLocationState } = useGameShipsActions();
  const { userName } = useAppSelector((state) => state.logInSlice);

  const connectHandler = (data: IStartGame & IConnect) => {
    const {
      isAbleShoot,
      isStarted,
      isGameFinded,
      field,
      user,
      opponentName,
      opponentField,
    } = data;

    if (user.name !== userName) {
      setOpponentName(user.name);
    } else {
      setIsAbleShoot(isAbleShoot);

      if (field) {
        setIsReady(true);
        updateShipsLocationState(field, PERSON.user);
      }

      if (opponentName) {
        setOpponentName(opponentName);
      }

      if (opponentField) {
        updateShipsLocationState(opponentField, PERSON.rival);
      }
    }

    setIsGameFinded(isGameFinded);
    setIsStarted(isStarted);

    if (data.isReconnect && user.name !== userName) {
      setStatus(t('winReconnect'));

      setTimeout(() => {
        setStatus('');
      }, 2000);
    }
  };

  return { connectHandler };
};
