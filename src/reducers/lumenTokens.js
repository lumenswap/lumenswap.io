import types from 'src/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.lumenTokens.SET: {
      return action.tokens;
    }

    case types.lumenTokens.ADD: {
      return [action.token, ...state];
    }

    default: {
      return state;
    }
  }
};
