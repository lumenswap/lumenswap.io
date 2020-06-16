import types from 'src/actions';

const defaultState = {
  logged: false,
  detail: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return { logged: true, detail: action.detail };
    }

    case types.LOGOUT: {
      return { logged: false, detail: {} };
    }

    default: {
      return state;
    }
  }
};
