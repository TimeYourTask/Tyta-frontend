import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_NOTIFICATION,
  REQUEST_RESET_PASSWORD_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from './types';

import AuthService from '../services/auth.service';

export const register =
  (username, email, password) => (dispatch) => AuthService.register(username, email, password).then(
    (res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: res },
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: 'Welcome! You can create your first team now!',
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
    (res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: res },
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: `Welcome back${res.firstName ? ` ${res.firstName}` : ''}!`,
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
  (email) => (dispatch) => AuthService.requestResetPassword(email).then(
    () => {
      dispatch({
        type: REQUEST_RESET_PASSWORD_SUCCESS,
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
        type: REQUEST_RESET_PASSWORD_FAILED,
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

export const resetPassword =
  // eslint-disable-next-line max-len
  ({ tokenId, token, newPassword }) => (dispatch) => AuthService.resetPassword({ tokenId, token, newPassword }).then(
    () => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: 'Password successfully change, please login with your new password!',
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
