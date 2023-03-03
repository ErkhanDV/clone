import { FC, useState, useContext, useEffect } from 'react';

import { Spinner } from '../_index';

import { useTranslation } from 'react-i18next';

import {
  useLogInActions,
  useAppSelector,
  useInviteStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';

import { SOCKETMETHOD } from '@/services/axios/_constants';

const Friend: FC = () => {
  const { t } = useTranslation();
  const { sendSocket } = useContext(SocketContext);

  // const [friend, setFriend] = useState('');
  const [validation, setValidation] = useState('');

  const { setModalOpen, setModalChildren } = useLogInActions();
  const { setInviteInProgress, setInviteTo } = useInviteStateActions();

  const {
    isModalOpen,
    isAuthorized,
    userName,
    inviteValidation,
    inviteInProgress,
    inviteTo,
  } = useAppSelector((state) => {
    const { isModalOpen, isAuthorized, userName } = state.logInSlice;
    const { gameInfo } = state.gameStateSlice;
    const { inviteValidation, inviteInProgress, inviteTo } =
      state.InviteStateSlice;

    return {
      isModalOpen,
      isAuthorized,
      gameInfo,
      userName,
      inviteValidation,
      inviteInProgress,
      inviteTo,
    };
  });

  useEffect(() => {
    if (!isModalOpen) {
      setValidation('');
      setInviteTo('');
    }
  }, [isModalOpen]);

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value.trim();
    if (value !== userName) {
      setInviteTo(value);
    } else {
      setValidation(t('inviteYourName') as string);
    }
  };

  const playHandler = async () => {
    if (isAuthorized) {
      if (!inviteTo) {
        setValidation(t('inviteEnterName') as string);
        return;
      } else if (inviteTo.length <= 3) {
        setValidation(t('inviteShort') as string);
        return;
      } else {
        const message = { server: userName, friend: inviteTo };

        sendSocket(SOCKETMETHOD.invite, message);
      }
    } else {
      setModalOpen(true);
      setModalChildren('log');
    }
  };

  const cancelHandler = () => {
    const message = {
      server: userName,
      friend: inviteTo,
      isFinded: true,
      isDeclined: true,
    };

    sendSocket(SOCKETMETHOD.invite, message);
    setInviteInProgress(false);
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={formHandler} className="login">
      <h2 className="friend_title">{t('friendGame')}</h2>
      {!inviteInProgress ? (
        <input
          className="login_input"
          onChange={inputHandler}
          value={inviteTo}
          type="text"
          placeholder={`${t('enterName')}`}
        />
      ) : null}
      <Spinner />

      <div className="login_validation">{validation}</div>
      {inviteValidation ? (
        <div className="login_validation">{inviteValidation}</div>
      ) : null}

      {!inviteInProgress ? (
        <button className="login_button" onClick={() => playHandler()}>
          {t('connect')}
        </button>
      ) : (
        <button className="login_button" onClick={() => cancelHandler()}>
          {t('cancel')}
        </button>
      )}
    </form>
  );
};

export default Friend;
