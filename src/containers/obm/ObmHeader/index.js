import urlMaker from 'helpers/urlMaker';
import LumenSwapHeader from 'components/LumenSwapHeader';

const ObmHeader = () => {
  const rightSide = [
    { name: 'Wallet', link: urlMaker.obm.wallet.root(), restricted: true },
    { name: 'My Orders', link: urlMaker.obm.order.root(), restricted: true },
  ];

  const leftSide = [
    { name: 'Market', link: urlMaker.obm.market.root() },
    { name: 'Swap', link: urlMaker.obm.swap.root() },
    {
      name: 'Spot',
      link: urlMaker.obm.spot.custom('XLM', null, 'USDC', null),
      mainHref: urlMaker.obm.spot.root(),
    },
  ];

  return (
    <LumenSwapHeader
      leftSide={leftSide}
      rightSide={rightSide}
    />
  );
};

export default ObmHeader;
