import TransactionStatusContent from 'src/shared/components/ModalContent/TransactionStatusContent';
import show from './show';

export default function showTxnStatus(props) {
  show(
    TransactionStatusContent,
    {},
    props,
  );
}
