import types from 'src/actions';
import store from 'src/store';

export default function lumenTokensAdd(token) {
  store.dispatch({
    type: types.lumenTokens.ADD,
    token,
  });
}
