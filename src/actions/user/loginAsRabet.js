import types from 'src/actions';
import store from 'src/store';
import { loginTypes } from 'src/reducers/user';

export default function loginAsRabet(publicKey) {
  store.dispatch({
    type: types.user.LOGIN,
    loginType: loginTypes.RABET,
    detail: {
      publicKey,
    },
  });
}
