import BidsData from './BidsData';

function BidTabContent({
  tab, page, setTotalPages, assetCode, searchQuery,
}) {
  if (tab === 'bids') {
    return (
      <BidsData
        page={page}
        assetCode={assetCode}
        searchQuery={searchQuery}
        setTotalPages={setTotalPages}
        tab={tab}
      />
    );
  }
  return null;
}

export default BidTabContent;
