import TopVolumeMarket from './TopVolumeMarket';
import KnownAssets from './KnownAssets';

const MarketTabContent = ({ tab, assets, searchQuery }) => {
  if (tab === 'assets') {
    return <KnownAssets assets={assets} searchQuery={searchQuery} />;
  }

  if (tab === 'topvolume') {
    return <TopVolumeMarket searchQuery={searchQuery} />;
  }

  return null;
};

export default MarketTabContent;
