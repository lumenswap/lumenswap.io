import actionTypes from 'actions';

export default function lspPriceReducer(state = '0', action) {
  switch (action.type) {
    case actionTypes.lspPrice.UPDATE: {
      return action.price;
    }

    default:
      return state;
  }
}
