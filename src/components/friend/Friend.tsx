import { FC, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogInActions, useCheckAuth, useAppSelector } from '@/hook/_index';
import { SocketContext } from '@/context/Context';
// import { gameService } from '@/services/axios/Game';
import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const Friend: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sendSocket } = useContext(SocketContext);
  const { checkAuth } = useCheckAuth(sendSocket);

  const [friend, setFriend] = useState('');
  const [validation, setValidation] = useState('');
  const [gameTryConnect, setGameTryConnect] = useState(false);

  const { setModalOpen, setModalChildren } = useLogInActions();

  const { isModalOpen, isAuthorized, gameInfo } = useAppSelector((state) => {
    const { isModalOpen, isAuthorized } = state.logInSlice;
    const { gameInfo } = state.gameStateSlice;

    return { isModalOpen, isAuthorized, gameInfo };
  });

  useEffect(() => {
    if (!gameTryConnect) {
      setValidation('');
      setFriend('');
    }
  }, [isModalOpen]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setFriend(target.value);

  const playHandler = async (mode: string) => {
    if (isAuthorized) {
      let error: string | undefined;
      if (gameInfo) {
        sendSocket(SOCKETMETHOD.exit);
      }

      // await gameService.dropGame();

      if (mode === 'create') {
        error = await checkAuth('', true);
      } else {
        if (!friend) {
          setValidation('Enter friend`s name');
          return;
        }
        error = await checkAuth(friend.trim(), true);
      }

      if (error && typeof error === 'string') {
        setValidation(error);
        return;
      } else {
        setModalOpen(false);

        if (location.pathname !== ROUTE.game) {
          navigate(ROUTE.game);
        }
      }
    }

    if (!isAuthorized) {
      setGameTryConnect(true);
      setModalOpen(true);
      setModalChildren('log');
    }
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={formHandler} className="login">
      <h2 className="friend_title">{t('friendGame')}</h2>
      <input
        className="login_input"
        onChange={inputHandler}
        value={friend}
        type="text"
        placeholder={`${t('enterName')}`}
      />
      <div className="login_validation">{validation}</div>
      <button className="login_button" onClick={() => playHandler('connect')}>
        {t('connect')}
      </button>
      <span>{t('or')}</span>
      <button className="login_button" onClick={() => playHandler('create')}>
        {t('create game')}
      </button>
    </form>
  );
};

export default Friend;
