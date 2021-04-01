import { combineReducers } from 'redux';
import modalReducer from './modal';
import userCustomTokensReducer from './userCustomTokens';
import user from './user';
import userBalanceReducer from './userBalance';

export default combineReducers({
  user,
  userCustomTokens: userCustomTokensReducer,
  modal: modalReducer,
  userBalance: userBalanceReducer,
});
