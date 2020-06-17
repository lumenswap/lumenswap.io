import types from 'src/actions';
import store from 'src/store';

export default (Modal, customProps) => {
  store.dispatch({
    type: types.modal.SHOW,
    Modal,
    customProps,
  });
};
