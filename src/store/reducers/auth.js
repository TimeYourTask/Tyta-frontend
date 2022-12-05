import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REQUEST_RESET_PASSWORD_FAILED,
  REQUEST_RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case REQUEST_RESET_PASSWORD_SUCCESS:
    case REQUEST_RESET_PASSWORD_FAILED:
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
