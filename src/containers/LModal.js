import { useSelector } from 'react-redux';
import { closeModalAction } from '../actions/modal';
import ModalDialog from '../components/ModalDialog';

export default function LModal() {
  const modal = useSelector((state) => state.modal);

  return (
    <ModalDialog show={modal.open} setShow={closeModalAction} {...modal.modalProps}>
      {modal.content}
    </ModalDialog>
  );
}
