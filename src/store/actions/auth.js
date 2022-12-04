import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_NOTIFICATION,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from './types';

import AuthService from '../services/auth.service';

export const register =
  (username, email, password) => (dispatch) => AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: response.data.message,
          type: 'success',
        },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'error',
          message,
        },
      });

      return Promise.reject();
    }
  );

export const login =
  (email, password) => (dispatch) => AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: 'Welcome back {firstname}!',
          type: 'success',
        },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message,
          type: 'error',
        },
      });

      return Promise.reject();
    }
  );

export const requestResetPassword =
  (email) => (dispatch) => AuthService.login(email).then(
    (data) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: { user: data },
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: 'Email sent! We let you go and see, we\'ll see you soon :)',
          type: 'success',
        },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

      dispatch({
        type: RESET_PASSWORD_FAILED,
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message,
          type: 'error',
        },
      });

      return Promise.reject();
    }
  );

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
