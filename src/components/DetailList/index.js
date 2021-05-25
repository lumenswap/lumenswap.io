import { fetchOrderBookAPI } from 'api/stellar';
import classNames from 'classnames';
import { getTradeAggregation } from 'components/TradingviewChart/utils';
import BN from 'helpers/BN';
import minimizeAddress from 'helpers/minimizeAddress';
import sevenDigit from 'helpers/sevenDigit';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const DetailList = ({ appSpotPair }) => {
  const [detailData, setDetailData] = useState([
    { title: 'Price', value: '-' },
    { title: '24 Change', value: '-', status: 'buy' },
    { title: '24 High', value: '-' },
    { title: '24 Low', value: '-' },
    { title: '24 Volume (-)', value: '-' },
    { title: '24 Volume (-)', value: '-' },
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

  useEffect(() => {
    async function loadData() {
      try {
        const currentTime = Date.now();
        const startTime = moment(currentTime).startOf('second').subtract(2, 'days');
        const endTime = moment(currentTime).startOf('second').add(1, 'days');

        const tradeData = await getTradeAggregation(
          appSpotPair.base,
          appSpotPair.counter,
          startTime,
          endTime,
          { candle: [], volume: [], line: [] },
          1,
        );

        const orderData = await fetchOrderBookAPI(appSpotPair.base, appSpotPair.counter, {
          limit: 1,
        });
        let total = 0;
        if (orderData.data?.asks[0]) {
          total = sevenDigit((new BN(orderData.data.asks[0]?.price)
            .plus(orderData.data.bids[0]?.price))
            .div(2)
            .toFixed(7));
        }

        const lastData = tradeData.candle[0];
        let ch24 = 0;
        if (lastData) {
          ch24 = (new BN(lastData.open).minus(lastData.close))
            .div(lastData.open)
            .times(-100);
        }

        setDetailData([
          { title: 'Price', value: total },
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
      } catch (e) {
        console.error(e);
      }
    }

    loadData();
  }, [appSpotPair.base, appSpotPair.counter]);

  const setStatusStyle = (status) => {
    if (status === 'buy') {
      return 'color-buy';
    }

    if (status === 'sell') {
      return 'color-sell';
    }
    return null;
  };

  return (
    <div className="row">
      {detailData.map((item, index) => (
        <div
          className={classNames('col-auto mb-lg-0 mb-md-1 mb-sm-1 mb-1',
            styles.col, (item.status === 'bold') && styles.bold)}
          key={index}
        >
          <div className={styles.title}>{item.title}</div>
          {item.status === 'link'
            ? (
              <a
                className={classNames(styles.value, styles.link)}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >{item.value} <span className="icon-external" />
              </a>
            )
            : (
              <div className={classNames(styles.value, setStatusStyle(item.status))}>

                {item.value}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default DetailList;
