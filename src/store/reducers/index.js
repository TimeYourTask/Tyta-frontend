import { combineReducers } from 'redux';
import auth from './auth';
import notification from './notification';
import teams from './teams';
import users from './users';

export default combineReducers({
  auth,
  notification,
  teams,
  users,
});
