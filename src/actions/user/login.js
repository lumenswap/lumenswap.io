import actionTypes from 'actions';
import store from 'store';

export default function login(loginType, detail) {
  store.dispatch({
    type: actionTypes.user.LOGIN,
    loginType,
    detail,
  });
}
