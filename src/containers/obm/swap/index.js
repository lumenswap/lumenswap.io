import LumenSwapSwap from 'components/complex/LumenSwapSwap';

const SwapPage = ({ custom, errorCode, defaultTokens }) => (
  <LumenSwapSwap
    defaultTokens={defaultTokens}
    custom={custom}
    errorCode={errorCode}
  />
);

export default SwapPage;
