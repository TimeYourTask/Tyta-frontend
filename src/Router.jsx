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
import CreateProject from './pages/Projects/CreateProject/CreateProject';
import TeamProjects from './pages/Projects/TeamProjects/TeamProjects';
import AddUserToProject from './pages/Projects/AddUserToProject/AddUserToProject';

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
        { path: 'overview', element: <Overview /> },
        { path: 'teams', element: <ListTeams /> },
        { path: 'teams/add', element: <AddTeam /> },
        { path: 'team/:teamID/edit', element: <UpdateTeam /> },
        { path: 'team/:teamID/users', element: <AddUserToTeam /> },
        { path: 'team/:teamID/projects', element: <TeamProjects /> },
        { path: 'team/:teamID/projects/add', element: <CreateProject /> },
        { path: 'team/:teamID/project/:projectId/edit', element: <CreateProject /> },
        { path: 'team/:teamID/project/:projectId/users', element: <AddUserToProject /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ];

  return useRoutes(mainRoutes);
};

export default Router;
