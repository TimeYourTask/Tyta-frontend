import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DefaultLayout from './Components/Layouts/Default/Default.layout';

const Router = () => {
  const { message } = useSelector((state) => state.init);

  const mainRoutes = [
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <h1>{message}</h1> },
        // { path: 'register', element: <Register /> },
        // { path: 'login', element: <Login /> },
      ],
    },
    { path: '404', element: <h1>Not found</h1> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ];

  const routing = useRoutes(mainRoutes);

  return routing;
};

export default Router;
