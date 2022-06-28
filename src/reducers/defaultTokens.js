import actionTypes from 'actions';

const defaultState = [];

export default function defaultTokensReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.defaultTokens.GET: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
