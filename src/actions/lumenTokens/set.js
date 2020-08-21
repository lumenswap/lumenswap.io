import types from 'src/actions';
import store from 'src/store';

export default function lumenTokensSet(tokens) {
  store.dispatch({
    type: types.lumenTokens.SET,
    tokens,
  });
}
