import actionTypes from 'actions';

const defaultState = { open: false, modalProps: {}, content: null };

export default function modalReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.modal.OPEN:
      return {
        open: true,
        modalProps: action.modalProps,
        content: action.content,
      };
    case actionTypes.modal.CLOSE:
      return {
        ...state,
        open: false,
      };
    case actionTypes.modal.UPDATE_PROPS:
      return {
        ...state,
        modalProps: {
          ...state.modalProps,
          ...action.props,
        },
      };
    default:
      return state;
  }
}
