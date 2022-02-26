import SingleAuctionBids from './SingleAuctionBids';
import SingleAuctionWinners from './SingleAuctionWinners';

const SingleAuctionContent = ({
  tab, searchQuery, assetCode, assetIssuer, auctionId, basePrice, refreshData, auctionStatus,
}) => {
  if (tab === 'bid') {
    return (
      <SingleAuctionBids
        searchQuery={searchQuery}
        tab={tab}
        assetCode={assetCode}
        assetIssuer={assetIssuer}
        basePrice={basePrice}
        refreshData={refreshData}
        auctionId={auctionId}
        auctionStatus={auctionStatus}
      />
    );
  }
  if (tab === 'winner') {
    return (
      <SingleAuctionWinners
        searchQuery={searchQuery}
        tab={tab}
        assetCode={assetCode}
        auctionId={auctionId}
      />
    );
  }
  return null;
};

export default SingleAuctionContent;
