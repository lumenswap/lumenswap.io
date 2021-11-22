import WinnersData from './WinnersData';

function WinnersTabContent({
  tab, page, setTotalPages, assetCode, searchQuery,
}) {
  if (tab === 'winners') {
    return (
      <WinnersData
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

export default WinnersTabContent;
