import PoolsActivityData from './PoolsActivityData';
import PoolSwapsData from './PoolSwapsData';

function PoolDetailsTabContent({ tab, poolId }) {
  if (tab === 'swaps') {
    return <PoolSwapsData poolId={poolId} />;
  }
  if (tab === 'activity') {
    return <PoolsActivityData poolId={poolId} />;
  }
}

export default PoolDetailsTabContent;
