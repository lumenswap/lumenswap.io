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
      link: '/',
      disableMainHref: true,
      external: true,
    },
  ];
  const rightSideLinks = [
    {
      name: 'My Tickets',
      link: urlMaker.auction.tickets(),
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
