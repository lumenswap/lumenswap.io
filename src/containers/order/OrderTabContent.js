import OpenOrder from './OpenOrder';
import TradeHistory from './TradeHistory';

const OrderTabContent = ({ tab, openOrderList, setOpenOrderList }) => {
  if (tab === 'order') {
    return <OpenOrder openOrderList={openOrderList} setOpenOrderList={setOpenOrderList} />;
  }

  if (tab === 'trade') {
    return <TradeHistory />;
  }

  return null;
};

export default OrderTabContent;
