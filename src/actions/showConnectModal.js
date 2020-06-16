import store from 'src/store';
import types from 'src/actions';

export default () => {
  store.dispatch({
    type: types.SHOW_CONNECT_MODAL,
  });
};
