import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import DefaultLayout from './components/Layouts/Default/Default.layout';
import ConnectedLayout from './components/Layouts/Connected/Connected.layout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Forbidden from './pages/Forbidden/Forbidden';

const Router = () => {
  // const { message } = useSelector((state) => state.init);

  const mainRoutes = [
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Home /> },
        // { path: 'register', element: <Register /> },
        // { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '500', element: <Forbidden /> },
      ],
    },
    {
      path: '/team',
      element: <ConnectedLayout />,
      children: [{ path: '', element: <Home /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ];

  const routing = useRoutes(mainRoutes);

  return routing;
};

export default Router;
