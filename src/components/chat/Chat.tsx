import {
  FC,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';

import Welcome from './welcome/Welcome';
import Message from './message/Message';

import './Chat.scss';

import { SocketContext } from '@/context/Context';
import {
  useAppSelector,
  useChatActions,
  useInviteStateActions,
  useLogInActions,
} from '@/hook/_index';

import { SOCKETMETHOD } from '@/services/axios/_constants';
import { CHAT, MODAL } from '@/store/_constants';

const Chat: FC = () => {
  const { t } = useTranslation();
  const { sendSocket } = useContext(SocketContext);
  const { changeChat, setUnreadCommon, setUnreadGame } = useChatActions();
  const { setInviteTo } = useInviteStateActions();
  const { setModalOpen, setModalChildren } = useLogInActions();

  const {
    currentChat,
    game,
    common,
    userName,
    gameInfo,
    unreadGame,
    unreadCommon,
    onlineNames,
  } = useAppSelector((state) => {
    const { game } = state.ChatSlice;
    const { common } = state.ChatSlice;
    const { currentChat } = state.ChatSlice;
    const { userName } = state.logInSlice;
    const { gameInfo } = state.gameStateSlice;
    const { unreadGame } = state.ChatSlice;
    const { unreadCommon } = state.ChatSlice;
    const { onlineNames } = state.logInSlice;

    return {
      game,
      common,
      currentChat,
      userName,
      gameInfo,
      unreadGame,
      unreadCommon,
      onlineNames,
    };
  });

  const currUnread = currentChat === CHAT.common ? unreadCommon : unreadGame;
  const [text, setText] = useState('');
  const chatElement = useRef<HTMLDivElement>(null);

  const editedNames = useCallback(() => {
    if (onlineNames.includes(userName)) {
      return onlineNames.filter((name) => name !== userName);
    }

    if (!userName) {
      let newNames: string[] = [];

      onlineNames.forEach((name, i) => {
        if (name === 'Unknown user') {
          newNames = [...onlineNames];
          newNames.splice(i, 1);
          return;
        }
      });

      return newNames;
    }
  }, [onlineNames]);

  useEffect(() => {
    if (chatElement.current) {
      chatElement.current.scrollTop = chatElement.current.scrollHeight;
    }
  }, [game, common]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setText(target.value);
  };

  const focusHandler = () => {
    if (currentChat === CHAT.common) {
      setTimeout(() => setUnreadCommon(true), 1000);
    } else {
      setTimeout(() => setUnreadGame(true), 1000);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    const sendName = userName ? userName : 'Unknown user';
    const mail = {
      name: sendName,
      date: new Date().toString(),
      text: text,
      gameId: gameInfo?.gameId,
      chatName: currentChat,
    };

    sendSocket(SOCKETMETHOD.chat, { mail });
    setText('');
  };

  const inviteHandler = (name: string) => {
    setModalOpen(true);
    setModalChildren(MODAL.friend)
    setInviteTo(name);
  };

  return (
    <div className="chat">
      <h2 className="section_title">{t('chat')}</h2>

      <button
        className={`chat_button ${currentChat === CHAT.common && 'active'}`}
        onClick={() => changeChat(CHAT.common)}
        type="button"
      >
        {t('generalChat')}
        <span className="unread">
          {unreadCommon ? `: ${unreadCommon}` : ''}
        </span>
      </button>
      <button
        className={`chat_button ${currentChat === CHAT.game && 'active'}`}
        disabled={!gameInfo}
        onClick={() => changeChat(CHAT.game)}
        type="button"
      >
        {t('gameChat')}
        <span className="unread"> {unreadGame ? `: ${unreadGame}` : ''}</span>
      </button>

      <div className="chat_wrapper">
        <div ref={chatElement} className="chat_messages">
          <Welcome />
          {(currentChat === CHAT.common || !gameInfo ? common : game).map(
            (mail, i, messages) => (
              <div key={i}>
                {messages.length - i === currUnread ? (
                  <div className="unread_line">new messages</div>
                ) : null}
                <Message mail={mail} />
              </div>
            ),
          )}
        </div>
        <div className="chat_online">
          <h4 className="chat_online_header">{t('usersOnline')}</h4>
          <div className="chat_online_list">
            {!(onlineNames.length <= 1)
              ? editedNames()?.map((name, i) => (
                  <div
                    onClick={() => inviteHandler(name)}
                    className="chat_online_name"
                    key={i}
                  >
                    {name}
                  </div>
                ))
              : t('emptyOnline')}
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="chat_input">
        <input
          onFocus={focusHandler}
          onChange={inputHandler}
          className="chat_write"
          type="text"
          value={text}
          placeholder={t('send') as string}
        />
        <button className="chat_button" type="submit">
          {t('send')}
        </button>
      </form>
    </div>
  );
};

export default Chat;
