import PoolsActivityData from './PoolsActivityData';
import PoolSwapsData from './PoolSwapsData';

function PoolDetailsTabContent({ tab, poolOperations, poolSwaps }) {
  if (tab === 'swaps') {
    return <PoolSwapsData poolSwaps={poolSwaps} />;
  }
  if (tab === 'activity') {
    return <PoolsActivityData poolOperations={poolOperations} />;
  }
}

export default PoolDetailsTabContent;
