import { closeModalAction } from 'actions/modal';
import ModalDialog from 'components/ModalDialog';
import { useSelector } from 'react-redux';

export default function LModal() {
  const modal = useSelector((state) => state.modal);

  return (
    <ModalDialog show={modal.open} setShow={closeModalAction} {...modal.modalProps}>
      {modal.content}
    </ModalDialog>
  );
}
