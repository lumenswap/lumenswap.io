import store from 'store';
import actionTypes from './index';

export function addCustomPairAction(asset) {
  store.dispatch({
    type: actionTypes.userCustomPairs.ADD,
    asset,
  });
}

export function removeCustomPairAction(asset) {
  store.dispatch({
    type: actionTypes.userCustomPairs.REMOVE,
    asset,
  });
}
