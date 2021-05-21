import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import DetailList from 'components/DetailList';
import SelectPair from 'blocks/SelectPair';
import { openModalAction } from 'actions/modal';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import stellarLogo from 'assets/images/stellar.png';
import { fetchOrderBookAPI, fetchTradeAggregationAPI, fetchTradeAPI } from 'api/stellar';
import getAssetDetails from 'helpers/getAssetDetails';
import USDC from 'tokens/USDC';
import XLM from 'tokens/XLM';
import moment from 'moment';
import BN from 'helpers/BN';
import TradingviewChart from 'components/TradingviewChart';
import sevenDigit from 'helpers/sevenDigit';
import numeral from 'numeral';
import InfoSection from './InfoSection';
import OrderSection from './OrderSection';
import TradeSection from './TradeSection';
import OrderFormSection from './OrderFormSection';
// import ChartSection from './ChartSection';
import styles from './styles.module.scss';

const ST_TR_COUNT = 100;

const openDialogElement = (className) => (
  <div className={styles['container-select']}>
    <button
      type="button"
      className={classNames(styles['select-logo'], className)}
      onClick={() => {
        openModalAction({
          modalProps: { title: 'Select a pair' },
          content: <SelectPair />,
        });
      }}
    >
      <img className={styles['first-coin']} src={usdLogo} alt="" />
      <img className={styles['second-coin']} src={stellarLogo} alt="" />
      USDC/XLM
      <span className="icon-angle-down ml-auto" />
    </button>
  </div>
);

function mapStellarAggregationData(oldData, newData) {
  const candle = newData.reverse().map((item, index) => {
    let open;
    if (index === 0) {
      if (oldData[oldData.length - 1]) {
        open = oldData[oldData.length - 1].close;
      } else {
        open = item.open;
      }
    } else if (newData[index - 1]) {
      open = newData[index - 1].close;
    }

    return {
      time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
      open,
      close: item.close,
      high: item.high,
      low: item.low,
      avg: item.avg,
      base_volume: item.base_volume,
      counter_volume: item.counter_volume,
    };
  });

  const line = newData.map((item) => ({
    time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
    value: item.avg,
  }));

  const volume = newData.map((item) => ({
    time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
    value: parseInt(item.base_volume, 10),
    color: new BN(item.open).isGreaterThan(item.close) ? '#f5dce6' : '#e8eedc',
  }));

  let innerOldCandle = [];
  const lastNewCandle = candle.slice(-1)[0];
  if (oldData.candle[0] && lastNewCandle) {
    innerOldCandle = [
      {
        ...oldData.candle[0],
        open: lastNewCandle.close,
      },
    ];
  } else if (oldData.candle[0]) {
    innerOldCandle = [oldData.candle[0]];
  }

  return {
    candle: [...candle, ...innerOldCandle, ...oldData.candle.slice(1)],
    volume: [...volume, ...oldData.volume],
    line: [...line, ...oldData.line],
    emptyNew: candle.length === 0,
  };
}

function getTradeAggregation(baseAsset, counterAsset, startTime, endTime, oldData) {
  return fetchTradeAggregationAPI(baseAsset, counterAsset, {
    start_time: startTime.valueOf(),
    end_time: endTime.valueOf(),
    resolution: 86400000,
    limit: ST_TR_COUNT + 10,
    offset: 0,
    order: 'desc',
  }).then((res) => mapStellarAggregationData(oldData, res.data._embedded.records));
}

const Spot = () => {
  const refHeight = useRef(null);
  const [height, setHeight] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [tradeListData, setTradeListData] = useState(null);
  const [orderBookData, setOrderBookData] = useState(null);
  const [isLoadingPrevented, setPreventLoading] = useState(false);
  const [detailData, setDetailData] = useState([
    { title: '24 Change', value: '-', status: 'buy' },
    { title: '24 High', value: '-' },
    { title: '24 Low', value: '-' },
    { title: '24 Volume (-)', value: '-' },
    { title: '24 Volume (-)', value: '-' },
    {
      title: '- asset issuer', value: '-', status: 'link', link: '/',
    },
    {
      title: '- asset issuer', value: '-', status: 'link', link: '/',
    },
  ]);
  const [pricePair, setPricePair] = useState(null);
  const lastFetchedTimeRef = useRef(null);
  const intervalTradesRef = useRef(null);
  const intervalOrdersRef = useRef(null);

  function getAggWrapper() {
    let startTime;
    let endTime;
    if (lastFetchedTimeRef.current === null) {
      const currentTime = Date.now();
      startTime = moment(currentTime).startOf('second').subtract(ST_TR_COUNT, 'days');
      endTime = moment(currentTime).startOf('second').add(1, 'days');
    } else {
      startTime = moment(lastFetchedTimeRef.current).subtract(ST_TR_COUNT + 1, 'days');
      endTime = moment(lastFetchedTimeRef.current).subtract(1, 'days');
    }

    return getTradeAggregation(
      getAssetDetails(XLM),
      getAssetDetails(USDC),
      startTime,
      endTime,
      chartData || { candle: [], volume: [], line: [] },
    )
      .then((res) => {
        if (res.emptyNew) {
          setPreventLoading(true);
        } else {
          setChartData(res);

          const lastData = res.candle[res.candle.length - 1];
          const oBLData = res.candle[res.candle.length - 2];
          if (lastData && oBLData) {
            const ch24 = (new BN(lastData.open).minus(lastData.close))
              .div(lastData.open)
              .times(-100);

            setDetailData([
              { title: '24 Change', value: `${ch24.toFixed(2)}%`, status: ch24.gt(0) ? 'buy' : 'sell' },
              { title: '24 High', value: numeral(lastData.high).format('0.0[00]a') },
              { title: '24 Low', value: numeral(lastData.low).format('0.0[00]a') },
              { title: '24 Volume (XLM)', value: numeral(lastData.base_volume).format('0.0a') },
              { title: '24 Volume (USDC)', value: numeral(lastData.counter_volume).format('0.0a') },
              {
                title: '- asset issuer', value: '-', status: 'link', link: '/',
              },
              {
                title: '- asset issuer', value: '-', status: 'link', link: '/',
              },
            ]);
          }

          lastFetchedTimeRef.current = startTime.valueOf();
        }
      }).catch(console.error);
  }

  useEffect(() => {
    if (refHeight.current) {
      setHeight(refHeight.current.offsetHeight);
    }
    console.warn(height);
  }, [refHeight.current]);

  function fetchingTradeApiCallWrapper() {
    fetchTradeAPI(getAssetDetails(XLM), getAssetDetails(USDC), {
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
    if (!intervalTradesRef.current) {
      fetchingTradeApiCallWrapper();
      setInterval(fetchingTradeApiCallWrapper, 10000);
    }

    return () => {
      clearInterval(intervalTradesRef.current);
    };
  }, []);

  function fetchingOrderAPICallWrapper() {
    fetchOrderBookAPI(getAssetDetails(XLM), getAssetDetails(USDC), {
      limit: 15,
    }).then((res) => {
      setOrderBookData(res.data);
      let total = 0;

      if (res.data?.asks[0]) {
        total = sevenDigit((new BN(res.data.asks[0].price).plus(res.data.bids[0].price))
          .div(2)
          .toFixed(7));
      }
      setPricePair(total);
    }).catch(console.error);
  }

  useEffect(() => {
    if (!intervalOrdersRef.current) {
      fetchingOrderAPICallWrapper();
      intervalOrdersRef.current = setInterval(fetchingOrderAPICallWrapper, 10000);
    }

    return () => {
      clearInterval(intervalOrdersRef.current);
    };
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <div className="layout mt-4 other">
        {/* top section */}
        <div className={classNames('row', styles.row)}>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 c-col d-lg-inline d-md-none d-sm-none d-none">
            <div className={classNames(styles.card, styles['card-select'])}>
              {openDialogElement('w-100')}
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 c-col">
            <div className={classNames(styles.card, styles['card-detail'])}>
              <div className="d-lg-none d-md-inline d-sm-inline d-inline mb-2">
                {openDialogElement('pl-0')}
              </div>
              <DetailList list={detailData} price={pricePair} />
            </div>
          </div>
        </div>
        <div className={classNames('row', styles.row)}>
          {/* order section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-xl-1 order-lg-2 order-sm-2 order-2 c-col">
            <div className={classNames(styles.card, styles['card-left'], 'invisible-scroll')}>
              <OrderSection orderBookData={orderBookData} />
            </div>
          </div>
          {/* middle section */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 order-xl-2 order-lg-1 order-md-1 order-sm-1 order-1 c-col">
            <div className={classNames(styles.card, styles['card-chart'], 'mb-1')} ref={refHeight}>
              <div>
                <TradingviewChart
                  chartData={chartData}
                  getAggWrapper={getAggWrapper}
                  isLoadingPrevented={isLoadingPrevented}
                />
              </div>
            </div>
            <div
              className={classNames(styles.card, styles['card-input'], 'mb-1')}
              style={{ height: `calc(100% - ${height + 4}px)` }}
            >
              <OrderFormSection />
            </div>
          </div>
          {/* trade section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-3 c-col">
            <div className={classNames(styles.card, styles['card-right'], 'invisible-scroll')}>
              <TradeSection tradeListData={tradeListData} />
            </div>
          </div>
        </div>
        {/* end section */}
        <div className={classNames('row', styles.row)}>
          <div className="col-12 c-col mb-5">
            <div className={classNames(styles.card, styles['card-table'])}>
              <InfoSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spot;
