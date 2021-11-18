import BidsData from './BidsData';
import WinnersData from './WinnersData';

const AuctionDetailContent = ({ tab }) => {
  if (tab === 'bid') {
    return (
      <BidsData />
    );
  }
  return (
    <WinnersData />
  );
};

export default AuctionDetailContent;
