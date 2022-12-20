import { GET_USERS_SUCCESS, GET_USERS_FAILED } from '../actions/types';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
