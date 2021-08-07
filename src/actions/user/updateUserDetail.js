import actionTypes from 'actions';

export default function updateUserDetail(detail) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.user.UPDATE_DETAIL,
      detail,
    });
  };
}
