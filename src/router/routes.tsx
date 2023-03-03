import { Home, Rules, Game } from '@/pages/_index';
import { IRoute } from './_types';
import { ROUTE, GAMEMODE } from './_constants';

const routes: IRoute[] = [
  {
    path: ROUTE.home,
    element: <Home />,
  },
  {
    path: ROUTE.single,
    element: <Game mode={GAMEMODE.SP} />,
  },
  {
    path: ROUTE.game,
    element: <Game mode={GAMEMODE.MP} />,
  },
  {
    path: ROUTE.rules,
    element: <Rules />,
  },
];

export default routes;
