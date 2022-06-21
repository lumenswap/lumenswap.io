import BN from 'helpers/BN';
import { useEffect, useRef, useState } from 'react';

import { fetchTradeAPI } from 'api/stellar';
import CustomTabs from 'containers/obm/spot/TradeSection/CustomTabs';
import FetchDataLoading from 'components/FetchDataLoading';
import { getAssetDetails } from 'helpers/asset';
import TradeList from '../OrderSection/SpotList/TradeList';

import styles from '../styles.module.scss';

const TradeSection = ({ appSpotPair }) => {
  const [tradeListData, setTradeListData] = useState(null);
  const intervalRef = useRef(null);

  function fetchingTradeApiCallWrapper() {
    fetchTradeAPI(getAssetDetails(appSpotPair.base), getAssetDetails(appSpotPair.counter), {
      limit: 37,
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
      clearInterval(intervalRef.current);
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
    `Price (${appSpotPair.counter.code})`,
    `Amount (${appSpotPair.base.code})`,
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
        {tradeListData === null ? <FetchDataLoading />
          : <TradeList headerItem={tradeListHeader} rowItems={tradeListData} />}
      </div>
    </>
  );
};

export default TradeSection;
