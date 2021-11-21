import BidsData from './BidsData';
import WinnersData from './WinnersData';

const AuctionDetailContent = ({ tab }) => {
  console.log(`tabcontent  ${tab}`);
  if (tab === 'bid') {
    return (
      <BidsData />
    );
  }
  if (tab === 'winner') {
    return (
      <WinnersData />
    );
  }
  return null;
};

export default AuctionDetailContent;
