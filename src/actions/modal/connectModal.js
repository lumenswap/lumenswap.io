import ConnectWalletContent from 'src/shared/components/ModalContent/ConnectWalletContent';
import show from './show';

export default () => {
  show(ConnectWalletContent, {
    title: 'Connect Modal',
  });
};
