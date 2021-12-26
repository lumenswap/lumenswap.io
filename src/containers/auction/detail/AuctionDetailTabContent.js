import BidsData from './BidsData';
import WinnersData from './WinnersData';

const AuctionDetailContent = ({
  tab, searchQuery, assetCode, assetIssuer, auctionId, basePrice, refreshData,
}) => {
  if (tab === 'bid') {
    return (
      <BidsData
        searchQuery={searchQuery}
        tab={tab}
        assetCode={assetCode}
        assetIssuer={assetIssuer}
        basePrice={basePrice}
        refreshData={refreshData}
      />
    );
  }
  if (tab === 'winner') {
    return (
      <WinnersData
        searchQuery={searchQuery}
        tab={tab}
        assetCode={assetCode}
        auctionId={auctionId}
      />
    );
  }
  return null;
};

export default AuctionDetailContent;
