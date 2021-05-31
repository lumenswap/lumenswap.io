import store from 'store';
import actionTypes from './index';

// eslint-disable-next-line
export function setCustomOrderPriceAction(orderPrice) {
  store.dispatch({
    type: actionTypes.customOrderPrice.SET,
    toSet: orderPrice,
  });
}
