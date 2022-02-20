import { setCustomOrderPriceAction } from 'actions/customOrderPrice';
import { fetchOrderBookAPI } from 'api/stellar';
import BN from 'helpers/BN';
import humanizeAmount from 'helpers/humanizeAmount';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import LeftSideAppLumen from './SpotList/LeftSideAppLumen';

function setCustomOrderPriceInput(dispatch, data) {
  dispatch(setCustomOrderPriceAction({
    buy: data.asks[0]?.price || '',
    sell: data.bids[0]?.price || '',
  }));
}

const OrderSection = ({ appSpotPair, price, setPrice }) => {
  const [orderBookData, setOrderBookData] = useState(null);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  function fetchingOrderAPICallWrapper() {
    return fetchOrderBookAPI(appSpotPair.base, appSpotPair.counter, {
      limit: 17,
    }).then((res) => {
      setOrderBookData(res.data);
      return res.data;
    }).catch(console.error);
  }

  useEffect(() => {
    if (orderBookData?.asks[0] && orderBookData?.bids[0]) {
      setPrice(humanizeAmount((new BN(orderBookData.asks[0].price)
        .plus(orderBookData.bids[0].price))
        .div(2)
        .toFixed(7)));
    } else {
      setPrice(null);
    }
  }, [orderBookData]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setOrderBookData(null);
      fetchingOrderAPICallWrapper()
        .then((data) => {
          setCustomOrderPriceInput(dispatch, data);
        });
      intervalRef.current = setInterval(fetchingOrderAPICallWrapper, 10000);
    }
  }, [appSpotPair.base, appSpotPair.counter]);

  useEffect(() => {
    if (!intervalRef.current) {
      fetchingOrderAPICallWrapper()
        .then((data) => {
          setCustomOrderPriceInput(dispatch, data);
        });
      intervalRef.current = setInterval(fetchingOrderAPICallWrapper, 10000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

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
      info={price}
      setPrice={setPrice}
      appSpotPair={appSpotPair}
    />
  );
};

export default OrderSection;
