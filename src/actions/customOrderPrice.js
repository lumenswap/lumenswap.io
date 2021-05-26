import store from 'store';
import actionTypes from './index';

export function setCustomOrderPriceAction(orderPrice) {
  store.dispatch({
    type: actionTypes.customOrderPrice.SET,
    toSet: orderPrice,
  });
}
