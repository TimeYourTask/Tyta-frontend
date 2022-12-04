import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/types';

const initialState = {
  open: false,
  type: 'info',
  timeout: 5000,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        message: payload.message,
        type: payload.type,
        open: true,
      };

    case CLEAR_NOTIFICATION:
      return {
        ...state,
        message: '',
        open: false,
      };

    default:
      return state;
  }
};
