import OffersData from './OffersData';
import TradesData from './TradesData';

const NFTDetailsTabContent = ({ tab, lusiData, offers }) => {
  if (tab === 'offer') {
    return (
      <OffersData offers={offers} />
    );
  }
  return (
    <TradesData lusiData={lusiData} />
  );
};

export default NFTDetailsTabContent;
