import { useTranslation } from 'react-i18next';
import { useGameStateActions, useAppSelector } from '@/hook/_index';
import { IExit } from '@/store/reducers/types/socket';

export const useDisconnectHandler = () => {
  const { t } = useTranslation();
  const { setStatus } = useGameStateActions();
  const { userName } = useAppSelector((state) => state.logInSlice);

  const disconnectHandler = ({ user }: IExit) => {
    if (user !== userName) {
      setStatus(t('winDisconnect'));
    }
  };

  return { disconnectHandler };
};
