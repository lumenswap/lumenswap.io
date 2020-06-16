import store from 'src/store';
import types from 'src/actions';

export default () => {
  store.dispatch({
    type: types.HIDE_CONNECT_MODAL,
  });
};
