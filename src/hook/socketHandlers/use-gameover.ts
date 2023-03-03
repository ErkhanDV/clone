import { useGameStateActions } from '@/hook/_index';
import { useShootHandler } from './use-shoot';


import { IShoot } from '@/store/reducers/types/socket';

export const useGameoverHandler = () => {
  const { setIsAbleShoot, setWinner } = useGameStateActions();
  const { shootHandler } = useShootHandler();

  const gameoverHandler = (data: IShoot) => {
    const { winner } = data;

    shootHandler(data);
    setIsAbleShoot(false);

    if (winner) {
      setWinner(winner);
    }
  };

  return { gameoverHandler };
};
