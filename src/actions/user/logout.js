import actionTypes from 'actions';

export default function logout() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.user.LOGOUT,
    });
  };
}
