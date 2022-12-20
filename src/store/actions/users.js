import { GET_USERS_SUCCESS, GET_USERS_FAILED } from './types';

import UserService from '../services/users.service';

export const getUsers = () => (dispatch) =>
  UserService.getUsers()
    .then((res) => {
      dispatch({
        type: GET_USERS_SUCCESS,
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
        type: GET_USERS_FAILED,
      });

      return Promise.reject(message);
    });
