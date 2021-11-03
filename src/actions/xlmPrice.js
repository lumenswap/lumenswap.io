import actionTypes from './index';

export function updateXLMPrice(xlmPrice) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.xlmPrice.UPDATE,
      price: xlmPrice,
    });
  };
}
