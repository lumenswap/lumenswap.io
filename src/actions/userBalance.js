import actionTypes from 'actions';
import store from 'store';

export function setUserBalance(balance) {
  store.dispatch({
    type: actionTypes.userBalance.SET,
    balance,
  });
}

export function clearUserBalance() {
  store.dispatch({
    type: actionTypes.userBalance.CLEAR,
  });
}
