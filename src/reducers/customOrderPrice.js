import actionTypes from 'actions';

export default function customOrderPriceReducer(state = { sell: null, buy: null }, action) {
  switch (action.type) {
    case actionTypes.customOrderPrice.SET: {
      return {
        ...state,
        ...action.toSet,
      };
    }

    default:
      return state;
  }
}
