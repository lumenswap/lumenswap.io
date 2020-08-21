import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import checkout from './checkout';
import userToken from './userToken';
import lumenTokens from './lumenTokens';

export default combineReducers({
  user,
  modal,
  checkout,
  userToken,
  lumenTokens,
});
