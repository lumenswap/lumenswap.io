import actionTypes from './index';

export function setCustomOrderPriceAction(orderPrice) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.customOrderPrice.SET,
      toSet: orderPrice,
    });
  };
}
