import dynamic from 'next/dynamic';

import DepthChart from './DepthChart';

const TVChart = dynamic(() => import('./TVChart'), {
  ssr: false,
});

const ChartTabContent = ({ tab, appSpotPair }) => {
  if (tab === 'tvChart') {
    return <TVChart appSpotPair={appSpotPair} />;
  }

  if (tab === 'depthChart') {
    return <DepthChart appSpotPair={appSpotPair} />;
  }

  return null;
};

export default ChartTabContent;
