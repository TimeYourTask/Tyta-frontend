import React from 'react';

import { useRoutes } from 'react-router-dom';

import DefaultLayout from './components/Layouts/Default/Default.layout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Forbidden from './pages/Forbidden/Forbidden';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Register from './pages/Register/Register';
import ListTeams from './pages/Teams/ListTeams/ListTeams';
import AddUserToTeam from './pages/Teams/AddUserToTeam/AddUserToTeam';

const Router = () => {
  const mainRoutes = [
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '500', element: <Forbidden /> },
        {
          path: 'teams',
          element: <ListTeams />,
        },
      ],
    },
    {
      path: '/teams',
      element: <DefaultLayout />,
      children: [{ path: 'user/:teamID', element: <AddUserToTeam /> }],
    },
  ];

  const routing = useRoutes(mainRoutes);

  return routing;
};

export default Router;
