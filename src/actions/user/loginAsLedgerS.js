import types from 'src/actions';
import store from 'src/store';
import { loginTypes } from 'src/reducers/user';

export default function loginAsLedgerS(publicKey) {
  store.dispatch({
    type: types.user.LOGIN,
    loginType: loginTypes.LEDGER_S,
    detail: {
      publicKey,
    },
  });
}
