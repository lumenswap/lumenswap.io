import urlMaker from 'helpers/urlMaker';
import LumenSwapHeader from 'components/LumenSwapHeader';

const AMMHeader = () => {
  const leftSide = [
    {
      name: 'Pools',
      link: urlMaker.amm.pool.root(),
      mainHref: urlMaker.amm.pool.root(),
    },
    {
      name: 'Swap',
      link: urlMaker.amm.swap.root(),
    },
  ];
  const rightSide = [
    { name: 'Wallet', link: urlMaker.amm.wallet.root(), restricted: true },
    { name: 'My Pools', link: urlMaker.amm.myPool.root(), restricted: true },
  ];

  return (
    <LumenSwapHeader
      rightSide={rightSide}
      leftSide={leftSide}
    />
  );
};

export default AMMHeader;
