import types from 'src/actions';

const defaultState = {
  from: null,
  to: null,
  fromAsset: {},
  toAsset: {},
  counterPrice: '0.0',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.checkout.UPDATE: {
      return {
        ...state,
        ...action.toUpdate,
      };
    }

    case types.checkout.CLEAR: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};
