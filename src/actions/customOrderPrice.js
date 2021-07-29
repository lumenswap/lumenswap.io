import { initializeStore } from 'store';
import actionTypes from './index';

// eslint-disable-next-line
export function setCustomOrderPriceAction(orderPrice) {
  // todo: should ask about this
  const store = initializeStore();

  store.dispatch({
    type: actionTypes.customOrderPrice.SET,
    toSet: orderPrice,
  });
}
