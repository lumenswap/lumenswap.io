import types from 'src/actions';
import store from 'src/store';

export default (Modal, customProps, modalProps = {}) => {
  store.dispatch({
    type: types.modal.SHOW,
    Modal,
    customProps,
    modalProps,
  });
};
