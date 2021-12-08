import LumenSwapSwap from 'components/complex/LumenSwapSwap';
import { walletTypes } from 'helpers/consts';

const SwapPage = ({ custom, errorCode }) => (
  <LumenSwapSwap
    custom={custom}
    errorCode={errorCode}
    type={walletTypes.AMM}
  />
);

export default SwapPage;
