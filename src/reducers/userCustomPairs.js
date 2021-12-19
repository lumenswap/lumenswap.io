import actionTypes from 'actions';
import { isSamePair } from 'helpers/asset';

export default function userCustomPairsReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.userCustomPairs.ADD: {
      return [...state, action.asset];
    }

    case actionTypes.userCustomPairs.REMOVE: {
      const foundIndex = state.findIndex((item) => isSamePair(item, action.asset));
      if (foundIndex >= 0) {
        return [
          ...state.slice(0, foundIndex),
          ...state.slice(foundIndex + 1),
        ];
      }

      return state;
    }

    default:
      return state;
  }
}
