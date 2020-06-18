import types from 'src/actions';
import store from 'src/store';

export default (tokens) => {
  store.dispatch({
    type: types.userToken.SET,
    tokens,
  });
};
