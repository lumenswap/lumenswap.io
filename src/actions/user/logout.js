import actionTypes from 'actions';
import store from 'store';

export default () => {
  store.dispatch({
    type: actionTypes.user.LOGOUT,
  });
};
