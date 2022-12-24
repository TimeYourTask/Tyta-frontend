import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import DefaultLayout from './components/Layouts/Default/Default.layout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Forbidden from './pages/Forbidden/Forbidden';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Register from './pages/Register/Register';
import Overview from './pages/Overview/Overview';
import ListTeams from './pages/Teams/ListTeams/ListTeams';
import AddUserToTeam from './pages/Teams/AddUserToTeam/AddUserToTeam';
import ConnectedLayout from './components/Layouts/Connected/Connected.layout';
import RequireAuth from './components/Providers/RequireAuth';
import UpdateTeam from './pages/Teams/UpdateTeam/UpdateTeam';
import AddTeam from './pages/Teams/AddTeam/AddTeam';

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
      ],
    },
    {
      path: '/',
      element: (
        <RequireAuth>
          <ConnectedLayout />
        </RequireAuth>
      ),
      children: [

        { path: '', element: <ListTeams /> },
        { path: 'user/:teamID', element: <AddUserToTeam /> },
        { path: 'overview', element: <Overview /> },
        { path: 'teams', element: <ListTeams /> },
        { path: 'teams/add', element: <AddTeam /> },
        { path: 'team/:teamID/update', element: <UpdateTeam /> },
        { path: 'team/:teamID/users', element: <AddUserToTeam /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ];

  return useRoutes(mainRoutes);
};

export default Router;
