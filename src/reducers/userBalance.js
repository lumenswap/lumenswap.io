import actionTypes from 'actions';

export default function userBalanceReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.userBalance.SET:
      return action.balance;

    case actionTypes.userBalance.CLEAR:
      return [];

    default:
      return state;
  }
}
