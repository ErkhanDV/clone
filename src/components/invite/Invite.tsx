import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useAppSelector,
  useLogInActions,
  useInviteStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';

import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const Invite: FC = () => {
  const navigate = useNavigate();
  const { sendSocket } = useContext(SocketContext);
  const { setModalOpen } = useLogInActions();
  const { setInvite } = useInviteStateActions();

  const { invite } = useAppSelector((state) => state.InviteStateSlice);
  const { isAuthorized, userName } = useAppSelector(
    (state) => state.logInSlice,
  );

  const acceptHandler = async () => {
    if (isAuthorized) {
      const message = {
        server: invite,
        friend: userName,
        isDeclined: false,
        isFinded: true,
        isAproved: true,
      };

      sendSocket(SOCKETMETHOD.invite, message);

      setModalOpen(false);

      if (location.pathname !== ROUTE.game) {
        navigate(ROUTE.game);
      }
    }
  };

  const declineHandler = () => {
    const message = {
      server: invite,
      friend: userName,
      isDeclined: true,
      isFinded: true,
    };

    sendSocket(SOCKETMETHOD.invite, message);
    setModalOpen(false);
    setInvite('');
    return;
  };

  return (
    <div className="login">
      <h2 className="invite_title">{`${invite} invite you to battle with him...`}</h2>
      <button className="login_button" onClick={acceptHandler}>
        Play
      </button>
      <button className="login_button" onClick={declineHandler}>
        Decline
      </button>
    </div>
  );
};

export default Invite;
