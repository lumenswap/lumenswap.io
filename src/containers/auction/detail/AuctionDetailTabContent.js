import BidsData from './BidsData';

const AuctionDetailContent = ({ tab, lusiId }) => {
  if (tab === 'bid') {
    return (
      <BidsData />
    );
  }
  return (
    '2'
  );
};

export default AuctionDetailContent;
