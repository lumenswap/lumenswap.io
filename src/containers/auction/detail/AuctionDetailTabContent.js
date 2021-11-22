import BidsData from './BidsData';
import WinnersData from './WinnersData';

const AuctionDetailContent = ({ tab, searchQuery, assetCode }) => {
  if (tab === 'bid') {
    return (
      <BidsData searchQuery={searchQuery} tab={tab} assetCode={assetCode} />
    );
  }
  if (tab === 'winner') {
    return (
      <WinnersData searchQuery={searchQuery} tab={tab} assetCode={assetCode} />
    );
  }
  return null;
};

export default AuctionDetailContent;
