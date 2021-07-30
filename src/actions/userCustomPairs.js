import actionTypes from './index';

export function addCustomPairAction(asset) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.userCustomPairs.ADD,
      asset,
    });
  };
}

export function removeCustomPairAction(asset) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.userCustomPairs.REMOVE,
      asset,
    });
  };
}
