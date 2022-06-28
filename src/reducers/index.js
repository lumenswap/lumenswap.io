import { combineReducers } from 'redux';
import modalReducer from './modal';
import userCustomTokensReducer from './userCustomTokens';
import user from './user';
import userBalanceReducer from './userBalance';
import userCustomPairsReducer from './userCustomPairs';
import customOrderPriceReducer from './customOrderPrice';
import xlmPriceReducer from './xlmPrice';
import lspPriceReducer from './lspPrice';
import themeReducer from './theme';
import defaultTokensReducer from './defaultTokens';

export default combineReducers({
  user,
  userCustomTokens: userCustomTokensReducer,
  modal: modalReducer,
  userBalance: userBalanceReducer,
  userCustomPairs: userCustomPairsReducer,
  customOrderPrice: customOrderPriceReducer,
  xlmPrice: xlmPriceReducer,
  lspPrice: lspPriceReducer,
  theme: themeReducer,
  defaultTokens: defaultTokensReducer,
});
