import actionTypes from 'actions';

export function toggleTheme() {
  return {
    type: actionTypes.theme.TOGGLE,
  };
}
