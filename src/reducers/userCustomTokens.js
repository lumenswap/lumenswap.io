import actionTypes from 'actions';

export default function userCustomTokensReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.userCustomTokens.ADD:
      return [...state, action.asset];
    default:
      return state;
  }
}
