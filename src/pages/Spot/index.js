import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import DetailList from 'components/DetailList';
import { fetchOrderBookAPI, fetchTradeAPI } from 'api/stellar';
import getAssetDetails from 'helpers/getAssetDetails';
import USDC from 'tokens/USDC';
import XLM from 'tokens/XLM';
import moment from 'moment';
import BN from 'helpers/BN';
import TradingviewChart from 'components/TradingviewChart';
import sevenDigit from 'helpers/sevenDigit';
import numeral from 'numeral';
import minimizeAddress from 'helpers/minimizeAddress';
import InfoSection from './InfoSection';
import OrderSection from './OrderSection';
import TradeSection from './TradeSection';
import OrderFormSection from './OrderFormSection';
// import ChartSection from './ChartSection';
import styles from './styles.module.scss';
import { getTradeAggregation, ST_TR_COUNT } from './utils';
import OpenDialogElement from './OpenDialogElement';

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
      title: 'XLM asset issuer',
      value: 'Stellar Foundation',
      status: false,
      link: false,
    },
    {
      title: 'USDC asset issuer',
      value: minimizeAddress(USDC.issuer),
      status: 'link',
      link: `${process.env.REACT_APP_LUMENSCAN_URL}/account/${USDC.issuer}`,
    },
  ]);
  const [pricePair, setPricePair] = useState(null);
  const lastFetchedTimeRef = useRef(null);
  const intervalTradesRef = useRef(null);
  const intervalOrdersRef = useRef(null);
  const [appSpotPair, setAppSpotPair] = useState({
    base: getAssetDetails(XLM),
    counter: getAssetDetails(USDC),
  });

  function getAggWrapper(clearMode = false) {
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

    let innerChartData;
    if (clearMode) {
      innerChartData = { candle: [], volume: [], line: [] };
    } else if (!chartData) {
      innerChartData = { candle: [], volume: [], line: [] };
    } else {
      innerChartData = chartData;
    }

    return getTradeAggregation(
      appSpotPair.base,
      appSpotPair.counter,
      startTime,
      endTime,
      innerChartData,
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
                title: `${appSpotPair.base.getCode()} asset issuer`,
                value: appSpotPair.base.getIssuer() ? minimizeAddress(appSpotPair.counter.getIssuer()) : 'Stellar Foundation',
                status: appSpotPair.base.getIssuer() ? 'link' : false,
                link: appSpotPair.base.getIssuer() ? `${process.env.REACT_APP_LUMENSCAN_URL}/account/${appSpotPair.base.getIssuer()}` : false,
              },
              {
                title: `${appSpotPair.counter.getCode()} asset issuer`,
                value: appSpotPair.counter.getIssuer() ? minimizeAddress(appSpotPair.counter.getIssuer()) : 'Stellar Foundation',
                status: appSpotPair.counter.getIssuer() ? 'link' : false,
                link: appSpotPair.counter.getIssuer() ? `${process.env.REACT_APP_LUMENSCAN_URL}/account/${appSpotPair.counter.getIssuer()}` : false,
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
    if (!intervalTradesRef.current) {
      fetchingTradeApiCallWrapper();
      setInterval(fetchingTradeApiCallWrapper, 10000);
    }

    return () => {
      clearInterval(intervalTradesRef.current);
    };
  }, []);

  function fetchingOrderAPICallWrapper() {
    fetchOrderBookAPI(appSpotPair.base, appSpotPair.counter, {
      limit: 16,
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

  useEffect(() => {
    lastFetchedTimeRef.current = null;
    setPreventLoading(false);
    setChartData({ candle: [], volume: [], line: [] });
    setDetailData([
      { title: '24 Change', value: '-', status: 'sell' },
      { title: '24 High', value: '-' },
      { title: '24 Low', value: '-' },
      { title: '24 Volume (XLM)', value: '-' },
      { title: '24 Volume (USDC)', value: '-' },
      {
        title: `${appSpotPair.base.getCode()} asset issuer`,
        value: appSpotPair.base.getIssuer() ? minimizeAddress(appSpotPair.counter.getIssuer()) : 'Stellar Foundation',
        status: appSpotPair.base.getIssuer() ? 'link' : false,
        link: appSpotPair.base.getIssuer() ? `${process.env.REACT_APP_LUMENSCAN_URL}/account/${appSpotPair.base.getIssuer()}` : false,
      },
      {
        title: `${appSpotPair.counter.getCode()} asset issuer`,
        value: appSpotPair.counter.getIssuer() ? minimizeAddress(appSpotPair.counter.getIssuer()) : 'Stellar Foundation',
        status: appSpotPair.counter.getIssuer() ? 'link' : false,
        link: appSpotPair.counter.getIssuer() ? `${process.env.REACT_APP_LUMENSCAN_URL}/account/${appSpotPair.counter.getIssuer()}` : false,
      },
    ]);
    getAggWrapper(true);

    clearInterval(intervalOrdersRef.current);
    fetchingOrderAPICallWrapper();
    intervalOrdersRef.current = setInterval(fetchingOrderAPICallWrapper, 10000);

    clearInterval(intervalTradesRef.current);
    fetchingTradeApiCallWrapper();
    setInterval(fetchingTradeApiCallWrapper, 10000);
  }, [appSpotPair.base, appSpotPair.counter]);

  return (
    <div className="container-fluid">
      <Header />
      <div className="layout mt-4 other">
        {/* top section */}
        <div className={classNames('row', styles.row)}>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 c-col d-lg-inline d-md-none d-sm-none d-none">
            <div className={classNames(styles.card, styles['card-select'])}>
              <OpenDialogElement
                className="w-100"
                appSpotPair={appSpotPair}
                setAppSpotPair={setAppSpotPair}
              />
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 c-col">
            <div className={classNames(styles.card, styles['card-detail'])}>
              <div className="d-lg-none d-md-inline d-sm-inline d-inline mb-2">
                <OpenDialogElement
                  className="pl-0"
                  appSpotPair={appSpotPair}
                  setAppSpotPair={setAppSpotPair}
                />
              </div>
              <DetailList list={detailData} price={pricePair} appSpotPair={appSpotPair} />
            </div>
          </div>
        </div>
        <div className={classNames('row', styles.row)}>
          {/* order section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-xl-1 order-lg-2 order-sm-2 order-2 c-col">
            <div className={classNames(styles.card, styles['card-left'], 'invisible-scroll')}>
              <OrderSection orderBookData={orderBookData} appSpotPair={appSpotPair} />
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
              <OrderFormSection appSpotPair={appSpotPair} />
            </div>
          </div>
          {/* trade section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-3 c-col">
            <div className={classNames(styles.card, styles['card-right'], 'invisible-scroll')}>
              <TradeSection tradeListData={tradeListData} appSpotPair={appSpotPair} />
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
