import {
  ADD_USER_TEAMS_FAILED,
  ADD_USER_TEAMS_SUCCESS,
  CREATE_TEAM_FAILED,
  CREATE_TEAM_SUCCESS,
  GET_TEAMS_FAILED,
  GET_TEAMS_SUCCESS,
  SET_NOTIFICATION, UPDATE_TEAM_FAILED, UPDATE_TEAM_SUCCESS,
} from './types';

import TeamService from '../services/teams.service';

export const getTeams = () => (dispatch) => TeamService.getTeams()
  .then((res) => {
    dispatch({
      type: GET_TEAMS_SUCCESS,
      payload: res,
    });

    return Promise.resolve();
  })
  .catch((error) => {
    const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

    dispatch({
      type: GET_TEAMS_FAILED,
    });

    return Promise.reject(message);
  });
export const addUserToTeam = (team, user) => (dispatch) => TeamService.addUserToTeam(team, user)
  .then((res) => {
    dispatch({
      type: ADD_USER_TEAMS_SUCCESS,
      payload: res,
    });

    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message: 'Users added to the team !',
        type: 'success',
      },
    });

    return Promise.resolve();
  })
  .catch((error) => {
    const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

    dispatch({
      type: ADD_USER_TEAMS_FAILED,
    });

    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message,
        type: 'error',
      },
    });

    return Promise.reject(message);
  });

export const updateTeam = (team) => (dispatch) => TeamService.updateTeam(team)
  .then((res) => {
    dispatch({
      type: UPDATE_TEAM_SUCCESS,
      payload: res,
    });

    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message: 'Team updated !',
        type: 'success',
      },
    });

    return Promise.resolve();
  })
  .catch((error) => {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    dispatch({
      type: UPDATE_TEAM_FAILED,
    });

    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message,
        type: 'error',
      },
    });

    return Promise.reject(message);
  });
export const createTeam = (teamName) => (dispatch) => TeamService.createTeam(teamName)
  .then((res) => {
    dispatch({
      type: CREATE_TEAM_SUCCESS,
      payload: res,
    });

    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message: 'Team created !',
        type: 'success',
      },
    });

    return Promise.resolve();
  })
  .catch((error) => {
    const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

    dispatch({
      type: CREATE_TEAM_FAILED,
    });

    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        message,
        type: 'error',
      },
    });

    return Promise.reject(message);
  });
