import types from 'src/actions';
import store from 'src/store';
import { loginTypes } from 'src/reducers/user';

export default function loginAsFreighter(publicKey) {
  store.dispatch({
    type: types.user.LOGIN,
    loginType: loginTypes.FREIGHTER,
    detail: {
      publicKey,
    },
  });
}
