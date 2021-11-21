import OffersData from './OffersData';
import TradesData from './TradesData';

const NFTDetailsTabContent = ({ tab, lusiId }) => {
  if (tab === 'offer') {
    return (
      <OffersData id={lusiId} />
    );
  }
  return (
    <TradesData id={lusiId} />
  );
};

export default NFTDetailsTabContent;
