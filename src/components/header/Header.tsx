import { useState, useEffect, useContext, FC } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Header.scss';

import {
  useLogInActions,
  useAppSelector,
  useGameStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';
import { authService, gameService } from '@/services/axios/_index';

import { SOCKETMETHOD } from '@/services/axios/_constants';
import { ROUTE } from '@/router/_constants';
import { MODAL, PERSON } from '@/store/_constants';

const Header: FC = () => {
  const { t } = useTranslation();
  const { sendSocket } = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { setModalOpen, setModalChildren, setUserName } = useLogInActions();
  const { setGameInfo } = useGameStateActions();

  const { userName, isAuthorized, gameInfo, onlinePlayers } = useAppSelector(
    (state) => {
      const { isAuthorized } = state.logInSlice;
      const { userName } = state.logInSlice;
      const { gameInfo } = state.gameStateSlice;
      const { onlinePlayers } = state.logInSlice;

      return { isAuthorized, userName, gameInfo, onlinePlayers };
    },
  );

  const [menuVisible, setMenuVisible] = useState(false);
  const [gameTryConnect, setGameTryConnect] = useState(false);
  const [logStatus, setlogStatus] = useState('LogIn');

  useEffect(() => {
    setlogStatus(isAuthorized ? `Logout` : 'Login');

    (async () => {
      if (isAuthorized && gameTryConnect) {
        setGameTryConnect(false);
        onlineHandler();
      }
    })();
  }, [isAuthorized]);

  const modalHandler = (component: string) => {
    setModalOpen(true);
    setModalChildren(component);
    setMenuVisible(false);
  };

  const logHandler = async () => {
    if (isAuthorized) {
      setUserName('');
      sendSocket(SOCKETMETHOD.setName, { socketName: '' });

      await authService.logout();
      if (gameInfo) sendSocket(SOCKETMETHOD.exit);

      if (location.pathname === ROUTE.game) navigate(ROUTE.home);
    } else {
      modalHandler(MODAL.log);
    }
  };

  const onlineHandler = async () => {
    if (isAuthorized) {
      const response = await gameService.startGame();
      if (response && typeof response !== 'string') {
        sendSocket(SOCKETMETHOD.connect, response);
      }

      if (location.pathname !== ROUTE.game) {
        navigate(ROUTE.game);
      }
    } else {
      setGameTryConnect(true);
      modalHandler(MODAL.log);
    }
  };

  const singleHandler = async () => {
    setGameInfo({
      gameId: PERSON.computer,
      user: { id: PERSON.user, name: userName },
    });

    if (location.pathname !== ROUTE.single) {
      navigate(ROUTE.single);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="header_link">
        <h1 className="header_logo">
          {t('battle')}
          <span className="logo-image">{t('ship')}</span>
          <span className="header_online">
            {t('Players online')} {onlinePlayers}
          </span>
        </h1>
      </Link>

      <nav
        onClick={() => setMenuVisible(!menuVisible)}
        className={`header_navigation ${menuVisible && 'visible'}`}
      >
        <ul
          className="navigation_list"
          onClick={(event) => {
            event.stopPropagation();
            setMenuVisible(false);
          }}
        >
          <li className="navigation_item">
            <NavLink to={ROUTE.home} className="navigation_link">
              {t('home')}
            </NavLink>
          </li>
          <li className="navigation_item item-dropdown">
            <span className="navigation_link">{t('game')}</span>
            <ul className="navigation_dropdown">
              <li onClick={onlineHandler} className="dropdown-item">
                <span className="navigation_link">{t('vsRandom')}</span>
              </li>
              <li onClick={singleHandler} className="dropdown-item">
                {t('vsComputer')}
              </li>
              <li
                onClick={() => modalHandler(MODAL.friend)}
                className="dropdown-item"
              >
                <span className="navigation_link">{t('vsFriend')}</span>
              </li>
            </ul>
          </li>
          <li className="navigation_item">
            <NavLink to={ROUTE.rules} className="navigation_link">
              {t('rules')}
            </NavLink>
          </li>
          <li
            onClick={() => modalHandler(MODAL.settings)}
            className="navigation_item"
          >
            <span className="navigation_link">{t('settings')}</span>
          </li>
          <li className="navigation_item" onClick={() => logHandler()}>
            <span className="navigation_link">
              {logStatus}
              <span className="link-login">{userName}</span>
            </span>
          </li>
        </ul>
      </nav>
      <div
        className={`header_burger ${menuVisible && 'open'}`}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <span className={`burger-icon ${menuVisible && 'open'}`}></span>
      </div>
    </header>
  );
};

export default Header;
