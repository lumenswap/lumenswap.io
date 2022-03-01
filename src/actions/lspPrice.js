import actionTypes from './index';

export function updateLSPPrice(lspPrice) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.lspPrice.UPDATE,
      price: lspPrice,
    });
  };
}
