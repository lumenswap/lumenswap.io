import { fetchTradeAPI } from 'api/stellar';
import CustomTabs from 'components/CustomTabs';
import SpotList from 'components/SpotList';
import BN from 'helpers/BN';
import { useEffect, useRef, useState } from 'react';

import styles from '../styles.module.scss';

const TradeSection = ({ appSpotPair }) => {
  const [tradeListData, setTradeListData] = useState(null);
  const intervalRef = useRef(null);

  function fetchingTradeApiCallWrapper() {
    fetchTradeAPI(appSpotPair.base, appSpotPair.counter, {
      limit: 35,
      order: 'desc',
    }).then((res) => {
      setTradeListData(res.data._embedded.records.map((item) => ({
        base_amount: item.base_amount,
        base_is_seller: item.base_is_seller,
        counter_amount: new BN(1).div(item.base_amount).times(item.counter_amount).toFixed(5),
        time: item.ledger_close_time,
      })));
    }).catch(console.error);
  }

  useEffect(() => {
    if (intervalRef.current) {
      clearImmediate(intervalRef.current);
      setTradeListData(null);
      fetchingTradeApiCallWrapper();
      intervalRef.current = setInterval(fetchingTradeApiCallWrapper, 10000);
    }
  }, [appSpotPair.base, appSpotPair.counter]);

  useEffect(() => {
    if (!intervalRef.current) {
      fetchingTradeApiCallWrapper();
      intervalRef.current = setInterval(fetchingTradeApiCallWrapper, 10000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const tabData = [
    {
      title: 'Market Trades',
      id: 'one',
    },
    // { title: 'My Trades', id: 'two', content: 'You have no trades' },
  ];

  const tradeListHeader = [
    `Price (${appSpotPair.counter.getCode()})`,
    `Amount (${appSpotPair.base.getCode()})`,
    'Time',
  ];

  return (
    <>
      <CustomTabs
        tabs={tabData}
        activeTabId={tabData[0].id}
        fontSize={14}
        tabContent={() => null}
      />
      <div className={styles['trade-container']}>
        <SpotList type="trade" headerItem={tradeListHeader} items={tradeListData} />
      </div>
    </>
  );
};

export default TradeSection;
