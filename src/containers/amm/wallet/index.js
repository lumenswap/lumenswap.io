import LumenSwapWallet from 'components/complex/LumenSwapWallet';
import { walletTypes } from 'helpers/consts';

function WalletPage() {
  return <LumenSwapWallet type={walletTypes.AMM} />;
}

export default WalletPage;
