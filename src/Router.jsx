import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import DefaultLayout from './components/Layouts/Default/Default.layout';
import Home from './pages/Home/Home';

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
      ],
    },
    { path: '404', element: <h1>Not found</h1> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ];

  const routing = useRoutes(mainRoutes);

  return routing;
};

export default Router;
