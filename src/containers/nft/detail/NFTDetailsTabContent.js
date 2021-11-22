import OffersData from './OffersData';
import TradesData from './TradesData';

const NFTDetailsTabContent = ({ tab, lusiData }) => {
  if (tab === 'offer') {
    return (
      <OffersData lusiData={lusiData} />
    );
  }
  return (
    <TradesData lusiData={lusiData} />
  );
};

export default NFTDetailsTabContent;
