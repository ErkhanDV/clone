import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useLogInActions } from '@/hook/_index';
import { authService, gameService } from '@/services/axios/_index';

import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { TSendSocket } from '@/store/reducers/types/socket';

export const useCheckAuth = (sendSocket: TSendSocket) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUserName } = useLogInActions();
  const [checkInProccess, setCheckInProccess] = useState(false);

  const checkAuth = async () => {
    try {
      if (localStorage.getItem('token') && !checkInProccess) {
        setCheckInProccess(true);

        const auth = await authService.checkAuth();

        setCheckInProccess(false);

        if (auth) {
          await setUserName(auth.name);


          if (location.pathname === ROUTE.game) {
            const response = await gameService.startGame();
            if (response && typeof response !== 'string') {
              if (response) sendSocket(SOCKETMETHOD.connect, response);
            } else {
              navigate(ROUTE.home);
            }
          }
        } else {
          if (location.pathname === ROUTE.game) navigate(ROUTE.home);
        }
      }

      if (!localStorage.getItem('token') && !checkInProccess) {
        if (location.pathname === ROUTE.game) navigate(ROUTE.home);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { checkAuth };
};
