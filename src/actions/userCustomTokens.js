import actionTypes from './index';

export function addCustomTokenAction(asset) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.userCustomTokens.ADD,
      asset,
    });
  };
}

export function removeCustomTokenAction(asset) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.userCustomTokens.REMOVE,
      asset,
    });
  };
}
