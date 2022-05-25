import actionTypes from 'actions';

const defaultState = 'light';

export default function themeReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.theme.TOGGLE: {
      if (state === 'light') {
        return 'dark';
      }
      return 'light';
    }
    default: {
      return state;
    }
  }
}
