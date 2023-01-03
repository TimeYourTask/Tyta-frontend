import { combineReducers } from 'redux';
import auth from './auth';
import notification from './notification';
import teams from './teams';
import users from './users';
import taskDialog from './taskDialog';

export default combineReducers({
  auth,
  notification,
  teams,
  users,
  taskDialog,
});
