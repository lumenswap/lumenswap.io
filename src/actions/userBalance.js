import actionTypes from 'actions';
import store from 'store';

export default function setUserBalance(balance) {
  store.dispatch({
    type: actionTypes.userBalance.SET,
    balance,
  });
}
