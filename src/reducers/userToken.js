import types from 'src/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.userToken.SET: {
      return action.tokens;
    }

    default: {
      return state;
    }
  }
};
