import LumenSwapSwap from 'components/complex/LumenSwapSwap';
import { walletTypes } from 'components/complex/LumenSwapWallet/walletData';

const SwapPage = ({ custom, errorCode, defaultTokens }) => (
  <LumenSwapSwap
    defaultTokens={defaultTokens}
    custom={custom}
    errorCode={errorCode}
    type={walletTypes.AMM}
  />
);

export default SwapPage;
