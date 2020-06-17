import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';

export default combineReducers({
  user,
  modal,
});
