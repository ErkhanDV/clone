import { useAppDispatch } from '@/hook/_index';
import * as logInActions from '@/store/reducers/LogInSlice';

export const useLogInActions = () => {
  const dispatch = useAppDispatch();

  const setUserName = (user: string) =>
    dispatch(logInActions.setUserName(user));

  const setModalOpen = (state: boolean) =>
    dispatch(logInActions.setModalOpen(state));

  const setModalChildren = (component: string) =>
    dispatch(logInActions.setModalChildren(component));

  const setOnlinePlayers = (count: number) => {
    dispatch(logInActions.setOnlinePlayers(count));
  };

  const setOnlineNames = (names: string[]) => {
    dispatch(logInActions.setOnlineNames(names));
  };

  return {
    setUserName,
    setModalOpen,
    setModalChildren,
    setOnlinePlayers,
    setOnlineNames,
  };
};
