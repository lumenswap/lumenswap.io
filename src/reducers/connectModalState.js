import types from 'src/actions';

export default (state = false, action) => {
  switch (action.type) {
    case types.SHOW_CONNECT_MODAL: {
      return true;
    }

    case types.HIDE_CONNECT_MODAL: {
      return false;
    }

    default: {
      return state;
    }
  }
};
