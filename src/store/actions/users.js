import { GET_USERS_FAILED, GET_USERS_SUCCESS } from './types';

import UserService from '../services/users.service';

// eslint-disable-next-line import/prefer-default-export
export const getUsers = () => (dispatch) => UserService.getUsers()
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
