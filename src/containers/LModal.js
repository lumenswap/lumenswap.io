import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../actions/modal';
import ModalDialog from '../components/ModalDialog';

export default function LModal() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <ModalDialog
      show={modal.open}
      setShow={() => {
        dispatch(closeModalAction());
      }}
      {...modal.modalProps}
    >
      {modal.content}
    </ModalDialog>
  );
}
