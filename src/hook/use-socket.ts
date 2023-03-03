import { useCallback, useEffect, useRef } from 'react';
import {
  useAppSelector,
  useChatActions,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';
import { useSocketHandlers } from './socketHandlers/_index';
import { SOCKET, SOCKETMETHOD } from '@/services/axios/_constants';
import { TSocketMessage } from '@/store/reducers/types/socket';
import { ISendConnect, TSendSocket } from '@/store/reducers/types/socket';
import { PERSON } from '@/store/_constants';

export const useSocket = () => {
  const socket = useRef<WebSocket>();
  const {
    connectHandler,
    disconnectHandler,
    shootHandler,
    gameoverHandler,
    readyHandler,
    exitHandler,
    chatHandler,
    mailingHandler,
    inviteHandler,
    onlineHandler,
  } = useSocketHandlers();

  const { setGameInfo } = useGameStateActions();
  const { resetGameChat } = useChatActions();
  const { resetGameState } = useGameStateActions();
  const { resetGameShips } = useGameShipsActions();

  const { userName, gameInfo } = useAppSelector((state) => {
    const { userName } = state.logInSlice;
    const { gameInfo } = state.gameStateSlice;

    return { userName, gameInfo };
  });

  const {
    shoot,
    connect,
    disconnect,
    ready,
    gameover,
    exit,
    chat,
    mailing,
    invite,
    online,
  } = SOCKETMETHOD;

  useEffect(() => {
    if (socket.current) {
      if (socket.current.readyState === 1) {
        sendSocket(SOCKETMETHOD.setName, { socketName: userName });
      } else {
        socket.current.onopen = () => {
          sendSocket(SOCKETMETHOD.setName, { socketName: userName });
        };
      }
    }
  }, [userName]);

  useEffect(() => {
    socket.current = new WebSocket(SOCKET);

    socket.current.onopen = () => {
      sendSocket(SOCKETMETHOD.setName, { socketName: userName });
    };

    socket.current.onmessage = (response) => {
      const data: TSocketMessage = JSON.parse(response.data);
      const { method } = data;

      switch (method) {
        case connect:
          connectHandler(data);
          break;

        case chat:
          chatHandler(data);
          break;

        case mailing:
          mailingHandler(data);
          break;

        case online:
          onlineHandler(data);
          break;
      }
    };
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.onmessage = (response) => {
        const data: TSocketMessage = JSON.parse(response.data);
        const { method } = data;

        switch (method) {
          case connect:
            connectHandler(data);
            break;

          case disconnect:
            disconnectHandler(data);
            break;

          case ready:
            readyHandler(data);
            break;

          case shoot:
            shootHandler(data);
            break;

          case gameover:
            gameoverHandler(data);
            break;

          case chat:
            chatHandler(data);
            break;

          case exit:
            exitHandler(data);
            break;

          case mailing:
            mailingHandler(data);
            break;

          case invite:
            inviteHandler(data, sendSocket);
            break;

          case online:
            onlineHandler(data);
            break;
        }
      };
    }
  }, [socket.current, userName, gameInfo]);

  const sendSocket: TSendSocket = useCallback(
    (method, data) => {
      if (method === SOCKETMETHOD.connect) {
        if (gameInfo) {
          if (gameInfo.gameId !== PERSON.computer) {
            sendSocket(SOCKETMETHOD.exit);
          }
        }

        resetGameChat();
        resetGameState();
        resetGameShips();

        setGameInfo(data as ISendConnect);
      }

      if (socket.current) {
        socket.current.send(
          JSON.stringify({
            ...data,
            method: method,
          }),
        );
      }
    },
    [socket],
  );

  return { sendSocket };
};
