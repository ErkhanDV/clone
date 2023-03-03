import { Routes, Route } from 'react-router-dom';

import routes from './routes';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element }, key) => (
        <Route path={path} element={element} key={key} />
      ))}
    </Routes>
  );
};

export default AppRouter;
