import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import checkout from './checkout';

export default combineReducers({
  user,
  modal,
  checkout,
});
