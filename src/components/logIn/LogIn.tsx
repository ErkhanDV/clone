import { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { authService } from '@/services/axios/Auth';
import { useLogInActions, useAppSelector } from '@/hook/_index';
import { SocketContext } from '@/context/Context';

import './Login.scss';

import { IUser } from '@/services/axios/_types';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const LogIn: FC = () => {
  const { sendSocket } = useContext(SocketContext);
  const [loginValue, setLoginValue] = useState('');
  const [validation, setValidation] = useState('');
  const { setUserName, setModalOpen } = useLogInActions();
  const { isModalOpen } = useAppSelector((state) => state.logInSlice);

  const { t } = useTranslation();

  useEffect(() => {
    setValidation('');
    setLoginValue('');
  }, [isModalOpen]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setLoginValue(target.value);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response: IUser = await authService.login(loginValue.trim());
    if (typeof response === 'string') {
      setValidation(response);
      return;
    }

    if (response.name) {
      setLoginValue('');
      setUserName(response.name);
      sendSocket(SOCKETMETHOD.setName, { socketName: response.name });
      setModalOpen(false);
    }
  };

  return (
    <form onSubmit={formHandler} className="login">
      <h2 className="login_title">{t('authorization')}</h2>
      <input
        className="login_input"
        onChange={inputHandler}
        value={loginValue}
        type="text"
        placeholder={`${t('enterName')}`}
      />
      <div className="login_validation">{validation}</div>
      <button type="submit" className="login_button">
        {t('login')}
      </button>
    </form>
  );
};

export default LogIn;
