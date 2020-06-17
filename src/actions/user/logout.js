import types from 'src/actions';
import store from 'src/store';

export default () => {
  store.dispatch({
    type: types.user.LOGOUT,
  });
};
