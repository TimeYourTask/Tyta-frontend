import {
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED,
  ADD_USER_TEAMS_FAILED,
  ADD_USER_TEAMS_SUCCESS,
} from '../actions/types';

const initialState = {
  teams: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: payload,
      };
    case GET_TEAMS_FAILED:
      return {
        ...state,
      };
    case ADD_USER_TEAMS_SUCCESS:
      return {
        ...state,
        teams: payload,
      };
    case ADD_USER_TEAMS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
