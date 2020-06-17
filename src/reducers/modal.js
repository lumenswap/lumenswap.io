import types from 'src/actions';

const defaultState = {
  show: false,
  Modal: () => null,
  customProps: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.modal.SHOW: {
      return {
        show: true,
        Modal: action.Modal,
        customProps: action.customProps || {},
      };
    }

    case types.modal.HIDE: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};
