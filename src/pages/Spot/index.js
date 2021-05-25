import { useState } from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import getAssetDetails from 'helpers/getAssetDetails';
import USDC from 'tokens/USDC';
import XLM from 'tokens/XLM';
import TradingviewChart from 'components/TradingviewChart';
import DetailList from 'components/DetailList';
import InfoSection from './InfoSection';
import OrderSection from './OrderSection';
import TradeSection from './TradeSection';
import OrderFormSection from './OrderFormSection';
// import ChartSection from './ChartSection';
import styles from './styles.module.scss';
import OpenDialogElement from './OpenDialogElement';

const Spot = () => {
  // const refHeight = useRef(null);
  // const [height, setHeight] = useState(0);
  const [appSpotPair, setAppSpotPair] = useState({
    base: getAssetDetails(XLM),
    counter: getAssetDetails(USDC),
  });

  // useEffect(() => {
  //   if (refHeight.current) {
  //     console.count('setting height');
  //     setHeight(refHeight.current.offsetHeight);
  //   }
  //   console.warn(height);
  // }, [refHeight.current]);

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
              <DetailList appSpotPair={appSpotPair} />
            </div>
          </div>
        </div>
        <div className={classNames('row', styles.row)}>
          {/* order section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-xl-1 order-lg-2 order-sm-2 order-2 c-col">
            <div className={classNames(styles.card, styles['card-left'], 'invisible-scroll')}>
              <OrderSection appSpotPair={appSpotPair} />
            </div>
          </div>
          {/* middle section */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 order-xl-2 order-lg-1 order-md-1 order-sm-1 order-1 c-col">
            <div className={classNames(styles.card, styles['card-chart'], 'mb-1')}>
              <div>
                <TradingviewChart appSpotPair={appSpotPair} />
              </div>
            </div>
            <div
              className={classNames(styles.card, styles['card-input'], 'mb-1')}
              // style={{ height: `calc(100% - ${height + 4}px)` }}
            >
              <OrderFormSection appSpotPair={appSpotPair} />
            </div>
          </div>
          {/* trade section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-3 c-col">
            <div className={classNames(styles.card, styles['card-right'], 'invisible-scroll')}>
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
