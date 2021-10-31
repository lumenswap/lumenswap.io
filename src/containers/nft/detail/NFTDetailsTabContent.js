import OffersData from './OffersData';
import TradesData from './TradesData';

const NFTDetailsTabContent = ({ tab, lusiId }) => {
  if (tab === 'offer') {
    return (
      <OffersData />
    );
  }
  return (
    <TradesData />
  );
};

export default NFTDetailsTabContent;
