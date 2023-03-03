import { FC, useContext } from 'react';

import './Modal.scss';

import { LogIn, Settings, Friend, Invite } from '../_index';

import {
  useAppSelector,
  useInviteStateActions,
  useLogInActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';

import { MODAL } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const Modal: FC = () => {
  const { sendSocket } = useContext(SocketContext);
  const { setModalOpen } = useLogInActions();
  const { setInvite, resetInviteState } = useInviteStateActions();

  const { modalChildren, isModalOpen, userName } = useAppSelector(
    (state) => state.logInSlice,
  );
  const { invite, inviteInProgress, inviteTo } = useAppSelector(
    (state) => state.InviteStateSlice,
  );

  let modalComponent;

  switch (modalChildren) {
    case MODAL.log:
      modalComponent = <LogIn />;
      break;

    case MODAL.settings:
      modalComponent = <Settings />;
      break;

    case MODAL.friend:
      modalComponent = <Friend />;
      break;

    case MODAL.invite:
      modalComponent = <Invite />;
  }

  const closeHandler = () => {
    if (invite) {
      const message = {
        server: invite,
        friend: userName,
        isDeclined: true,
        isFinded: true,
      };

      sendSocket(SOCKETMETHOD.invite, message);
      setInvite('');
    }

    if (inviteInProgress) {
      const message = {
        server: userName,
        friend: inviteTo,
        isDeclined: true,
        isFinded: true,
      };

      sendSocket(SOCKETMETHOD.invite, message);
    }

    resetInviteState();

    setModalOpen(false);
  };

  return (
    <div
      className={`modal ${isModalOpen && 'open'}`}
      onMouseDown={closeHandler}
    >
      <div
        className={`modal_content ${isModalOpen && 'open'}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {modalComponent}
      </div>
    </div>
  );
};

export default Modal;
