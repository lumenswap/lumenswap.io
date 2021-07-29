import store from 'store';
import actionTypes from './index';

export function addCustomTokenAction(asset) {
  store.dispatch({
    type: actionTypes.userCustomTokens.ADD,
    asset,
  });
}

export function removeCustomTokenAction(asset) {
  store.dispatch({
    type: actionTypes.userCustomTokens.REMOVE,
    asset,
  });
}
