import { useLogInActions } from '@/hook/_index';

import { IOnline } from '@/store/reducers/types/socket';

export const useOnlineHandler = () => {
  const { setOnlinePlayers, setOnlineNames } = useLogInActions();

  const onlineHandler = ({ count, names }: IOnline) => {
    setOnlineNames(names);
    setOnlinePlayers(count);
  };

  return { onlineHandler };
};
