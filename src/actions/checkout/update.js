import types from 'src/actions';
import store from 'src/store';

export default (toUpdate) => {
  store.dispatch({
    type: types.checkout.UPDATE,
    toUpdate,
  });
};
