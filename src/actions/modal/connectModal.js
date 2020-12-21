import ConnectWalletContent from 'src/shared/components/ModalContent/ConnectWalletContent';
import show from './show';

export default function showConnectModal(title = 'Connect Wallet') {
  show(ConnectWalletContent, {
    title,
  });
}
