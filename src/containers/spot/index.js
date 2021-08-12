import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import dynamic from 'next/dynamic';
import getAssetDetails from 'helpers/getAssetDetails';
import USDC from 'tokens/USDC';
import XLM from 'tokens/XLM';
// import TradingviewChart from 'components/TradingviewChart';
import DetailList from 'components/DetailList';
import InfoSection from 'containers/spot/InfoSection';
import OrderSection from 'containers/spot/OrderSection';
import TradeSection from 'containers/spot/TradeSection';
import OrderFormSection from 'containers/spot/OrderFormSection';
import OpenDialogElement from 'containers/spot/OpenDialogElement';
import SpotHead from 'containers/spot/SpotHead';
import styles from './styles.module.scss';

const TVChart = dynamic(() => import('../../components/TVChart'), {
  ssr: false,
});

const Spot = ({ tokens }) => {
  const [appSpotPair, setAppSpotPair] = useState({
    base: getAssetDetails(XLM),
    counter: getAssetDetails(USDC),
  });

  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (tokens) {
      setAppSpotPair({
        base: getAssetDetails(tokens.from),
        counter: getAssetDetails(tokens.to),
      });
    }
  }, [tokens]);

  return (
    <div className="container-fluid">
      <SpotHead tokens={tokens} price={price} setPrice={setPrice} />
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
              <DetailList appSpotPair={appSpotPair} price={price} />
            </div>
          </div>
        </div>
        <div className={classNames('row', styles.row)}>
          {/* order section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-xl-1 order-lg-2 order-sm-2 order-2 c-col">
            <div
              className={classNames(
                styles.card,
                styles['card-left'],
                'invisible-scroll',
              )}
            >
              <OrderSection
                price={price}
                setPrice={setPrice}
                appSpotPair={appSpotPair}
              />
            </div>
          </div>
          {/* middle section */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 order-xl-2 order-lg-1 order-md-1 order-sm-1 order-1 c-col">
            <div
              className={classNames(styles.card, styles['card-chart'], 'mb-1')}
            >
              <div>
                <TVChart appSpotPair={appSpotPair} />
              </div>
            </div>
            <div
              className={classNames(styles.card, styles['card-input'])}
              // style={{ height: `calc(100% - ${height + 4}px)` }}
            >
              <OrderFormSection appSpotPair={appSpotPair} />
            </div>
          </div>
          {/* trade section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-3 c-col">
            <div
              className={classNames(
                styles.card,
                styles['card-right'],
                'invisible-scroll',
              )}
            >
              <TradeSection appSpotPair={appSpotPair} />
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
