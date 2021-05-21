import LeftSideAppLumen from 'components/SpotList/LeftSideAppLumen';
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
    <LeftSideAppLumen
      headerItem={orderListHeader}
      asks={orderBookData?.asks}
      bids={orderBookData?.bids}
      info={total}
    />
  );
};

export default OrderSection;
