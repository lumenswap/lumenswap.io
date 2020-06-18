import types from 'src/actions';
import store from 'src/store';

export default function hideModal() {
  store.dispatch({
    type: types.modal.HIDE,
  });
}
