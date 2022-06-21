import actionTypes from 'actions';

export function setDefaultTokens(defaultTokens) {
  return (dispatch) => dispatch({
    type: actionTypes.defaultTokens.GET,
    payload: defaultTokens,
  });
}
