import BidsData from './BidsData';

function BidTabContent({
  tab, page, setTotalPages, assetCode, searchQuery, auction,
}) {
  if (tab === 'bids') {
    return (
      <BidsData
        page={page}
        assetCode={assetCode}
        searchQuery={searchQuery}
        setTotalPages={setTotalPages}
        auction={auction}
        tab={tab}
      />
    );
  }
  return null;
}

export default BidTabContent;
