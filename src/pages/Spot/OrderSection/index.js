import SpotList from 'components/SpotList';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';

const orderListHeader = ['Price (USDC)', 'Amount (XLM)', 'Total'];

const OrderSection = ({ orderBookData }) => {
  let total = 0;

  if (orderBookData?.asks[0]) {
    total = sevenDigit((new BN(orderBookData.asks[0].price).plus(orderBookData.bids[0].price))
      .div(2)
      .toFixed(7));
  }

  return (
    <SpotList
      type="order"
      headerItem={orderListHeader}
      items={orderBookData}
      gapInfo={{
        total,
      }}
    />
  );
};

export default OrderSection;
