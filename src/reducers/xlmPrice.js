import actionTypes from 'actions';

export default function xlmPriceReducer(state = '0', action) {
  switch (action.type) {
    case actionTypes.xlmPrice.UPDATE: {
      return action.price;
    }

    default:
      return state;
  }
}
