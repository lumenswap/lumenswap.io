import WinnersData from './WinnersData';

function WinnersTabContent({
  tab, page, setTotalPages, assetCode, searchQuery, auction,
}) {
  if (tab === 'winners') {
    return (
      <WinnersData
        page={page}
        assetCode={assetCode}
        searchQuery={searchQuery}
        setTotalPages={setTotalPages}
        tab={tab}
        auction={auction}
      />
    );
  }
  return null;
}

export default WinnersTabContent;
