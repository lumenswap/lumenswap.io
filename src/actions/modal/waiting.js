import WaitingContent from 'src/shared/components/ModalContent/WaitingContent';
import show from './show';

export default function showWaitingModal(props) {
  show(WaitingContent, {}, props);
}
