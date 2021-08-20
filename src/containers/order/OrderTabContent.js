import OpenOrder from './OpenOrder';
import TradeHistory from './TradeHistory';

const OrderTabContent = ({ tab }) => {
  if (tab === 'order') {
    return <OpenOrder />;
  }

  if (tab === 'trade') {
    return <TradeHistory />;
  }

  return null;
};

export default OrderTabContent;
