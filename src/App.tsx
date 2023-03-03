import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from '@/router/AppRouter';

import { Header, Footer, Background, Modal } from '@/components/_index';

import {
  useSocket,
  useCheckAuth,
  useAppSelector,
  useChatActions,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';
import { checkLocalStorage } from './lib/utils/checkLocalStorage';

import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from './services/axios/_constants';

const App = () => {
  const location = useLocation();
  const { sendSocket } = useSocket();
  const { gameInfo } = useAppSelector((state) => state.gameStateSlice);
  const { checkAuth } = useCheckAuth(sendSocket);
  const { resetGameChat } = useChatActions();
  const { resetGameState } = useGameStateActions();
  const { resetGameShips } = useGameShipsActions();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const isMatchRoute = [ROUTE.home, ROUTE.rules, ROUTE.single].includes(
      location.pathname,
    );

    if (isMatchRoute && gameInfo) {
      sendSocket(SOCKETMETHOD.exit);

      resetGameChat();
      resetGameState();
      resetGameShips();
    }
  }, [location]);

  checkLocalStorage();

  return (
    <div className="App">
      <SocketContext.Provider value={{ sendSocket }}>
        <Header />
        <AppRouter />
        <Footer />
        <Modal />
      </SocketContext.Provider>
      <Background />
    </div>
  );
};

export default App;
