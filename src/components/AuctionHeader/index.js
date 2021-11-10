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
      name: 'My Tickets',
      link: urlMaker.auction.tickets(),
      disableMainHref: true,
    },
    {
      name: 'Learn about auction',
      link: '/',
      disableMainHref: true,
      external: true,
    },
  ];

  return (
    <LumenSwapHeader
      showLSP
      leftSide={leftSideLinks}
    />
  );
};

export default AuctionHeader;
