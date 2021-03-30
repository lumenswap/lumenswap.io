import actionTypes from 'actions';

export default function userBalanceReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.userBalance.SET:
      return action.balance;

    default:
      return state;
  }
}
