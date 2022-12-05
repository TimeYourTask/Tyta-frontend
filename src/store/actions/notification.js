import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from './types';

export const setNotification = (notificationPayload) => ({
  type: SET_NOTIFICATION,
  payload: notificationPayload,
});

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION,
});
