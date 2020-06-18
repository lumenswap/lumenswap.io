import types from 'src/actions';

const defaultState = {
  from: null,
  to: null,
  fromAsset: {},
  toAsset: {},
  counterPrice: 0,
  showAdvanced: false,
  tolerance: 0.005,
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
