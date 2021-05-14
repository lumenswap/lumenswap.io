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
import InfoSection from './InfoSection';
import OrderSection from './OrderSection';
import TradeSection from './TradeSection';
import OrderFormSection from './OrderFormSection';
import ChartSection from './ChartSection';
import styles from './styles.module.scss';

const details = [
  { title: '24 Change', value: '0.0432+7.45%', status: 'buy' },
  { title: '24 High', value: '2315.07' },
  { title: '24 Low', value: '2315.07' },
  { title: '24 Volume (XLM)', value: '2315.07' },
  { title: '24 Volume (USDC)', value: '2315.07' },
  { title: 'USDC asset issuer', value: 'GACJOH..LPSDVK' },
  { title: 'USDC asset issuer', value: 'GACPKH..LKELVK' },
];

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

const Spot = () => {
  const refHeight = useRef(null);
  const [height, setHeight] = useState(0);
  const [candleSeriesData, setCandleSeriesData] = useState(null);
  const [lineSeriesData, setLineSeriesData] = useState(null);
  const [volumeSeriesData, setVolumeSeriesData] = useState(null);
  const [tradeListData, setTradeListData] = useState(null);
  const [orderBookData, setOrderBookData] = useState(null);

  useEffect(() => {
    if (refHeight.current) {
      setHeight(refHeight.current.offsetHeight);
    }
    console.warn(height);
  }, [refHeight.current]);

  useEffect(() => {
    fetchTradeAggregationAPI(getAssetDetails(XLM), getAssetDetails(USDC), {
      start_time: 1609513130000,
      end_time: Date.now(),
      resolution: 86400000,
      limit: 200,
    }).then((res) => {
      const toData = res.data._embedded.records;

      setCandleSeriesData(toData.map((item) => ({
        time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
        open: item.open,
        close: item.close,
        high: item.high,
        low: item.low,
      })));

      setLineSeriesData(toData.map((item) => ({
        time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
        value: item.avg,
      })));

      setVolumeSeriesData(toData.map((item) => ({
        time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
        value: parseInt(item.base_volume, 10),
        color: new BN(item.open).isGreaterThan(item.close) ? '#f5dce6' : '#e8eedc',
      })));
    }).catch(console.error);
  }, []);

  useEffect(() => {
    fetchTradeAPI(getAssetDetails(XLM), getAssetDetails(USDC), {
      limit: 35,
    }).then((res) => {
      setTradeListData(res.data._embedded.records.map((item) => ({
        base_amount: item.base_amount,
        base_is_seller: item.base_is_seller,
        counter_amount: item.counter_amount,
        time: item.ledger_close_time,
      })));
    }).catch(console.error);
  }, []);

  useEffect(() => {
    fetchOrderBookAPI(getAssetDetails(XLM), getAssetDetails(USDC), {
      limit: 15,
    }).then((res) => {
      setOrderBookData(res.data);
    }).catch(console.error);
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
              <DetailList list={details} />
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
              <ChartSection
                candleSeriesData={candleSeriesData}
                lineSeriesData={lineSeriesData}
                volumeSeriesData={volumeSeriesData}
              />
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
