import actionTypes from 'actions';

export function setUserBalance(balance) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.userBalance.SET,
      balance,
    });
  };
}

export function clearUserBalance() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.userBalance.CLEAR,
    });
  };
}
