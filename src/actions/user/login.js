import actionTypes from 'actions';

export default function userLogin(loginType, detail) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.user.LOGIN,
      loginType,
      detail,
    });
  };
}
