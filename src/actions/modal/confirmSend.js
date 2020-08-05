import ConfirmSendContent from 'src/shared/components/ModalContent/ConfirmSendContent';
import show from './show';

export default function showConfirmSend(props) {
  show(
    ConfirmSendContent,
    {
      title: 'Confirm Send',
    },
    props
  );
}
