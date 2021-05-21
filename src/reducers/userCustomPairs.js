import actionTypes from 'actions';
import isSameAsset from 'helpers/isSameAsset';

export default function userCustomPairsReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.userCustomPairs.ADD: {
      return [...state, action.asset];
    }

    case actionTypes.userCustomPairs.REMOVE: {
      const foundIndex = state.findIndex((item) => isSameAsset(item, action.asset));
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
