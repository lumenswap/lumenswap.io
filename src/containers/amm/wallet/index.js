import LumenSwapWallet from 'components/complex/LumenSwapWallet';
import { walletTypes } from 'components/complex/LumenSwapWallet/walletData';

function WalletPage() {
  return <LumenSwapWallet type={walletTypes.AMM} />;
}

export default WalletPage;
