import urlMaker from 'helpers/urlMaker';
import LumenSwapHeader from 'components/LumenSwapHeader';

const AuctionHeader = () => {
  const leftSideLinks = [
    {
      name: 'Board',
      link: urlMaker.auction.root(),
      disableMainHref: true,
    },
    {
      name: 'Learn about auction',
      link: 'https://medium.com/lumenswap/eighth-milestone-auction-fa307d4b50e3',
      disableMainHref: true,
      external: true,
    },
  ];
  const rightSideLinks = [
    {
      name: 'My Bids',
      link: urlMaker.auction.bids(),
      disableMainHref: true,
      restricted: true,
    },
  ];

  return (
    <LumenSwapHeader
      showLSP
      leftSide={leftSideLinks}
      rightSide={rightSideLinks}
    />
  );
};

export default AuctionHeader;
