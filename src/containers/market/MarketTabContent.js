import TopVolumeMarket from './TopVolumeMarket';
import KnownAssets from './KnownAssets';

const MarketTabContent = ({ tab, assets }) => {
  if (tab === 'assets') {
    return <KnownAssets assets={assets} />;
  }

  if (tab === 'topvolume') {
    return <TopVolumeMarket />;
  }

  return null;
};

export default MarketTabContent;
