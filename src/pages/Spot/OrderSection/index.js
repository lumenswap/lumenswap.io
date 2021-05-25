import { fetchOrderBookAPI } from 'api/stellar';
import LeftSideAppLumen from 'components/SpotList/LeftSideAppLumen';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import { useEffect, useRef, useState } from 'react';

const OrderSection = ({ appSpotPair }) => {
  const [orderBookData, setOrderBookData] = useState(null);
  const intervalRef = useRef(null);

  function fetchingOrderAPICallWrapper() {
    fetchOrderBookAPI(appSpotPair.base, appSpotPair.counter, {
      limit: 16,
    }).then((res) => {
      setOrderBookData(res.data);
    }).catch(console.error);
  }

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setOrderBookData(null);
      fetchingOrderAPICallWrapper();
      intervalRef.current = setInterval(fetchingOrderAPICallWrapper, 10000);
    }
  }, [appSpotPair.base, appSpotPair.counter]);

  useEffect(() => {
    if (!intervalRef.current) {
      fetchingOrderAPICallWrapper();
      intervalRef.current = setInterval(fetchingOrderAPICallWrapper, 10000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  let total = 0;

  if (orderBookData?.asks[0]) {
    total = sevenDigit((new BN(orderBookData.asks[0].price).plus(orderBookData.bids[0].price))
      .div(2)
      .toFixed(7));
  }

  const orderListHeader = [
    `Price (${appSpotPair.counter.getCode()})`,
    `Amount (${appSpotPair.base.getCode()})`,
    'Total',
  ];

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
