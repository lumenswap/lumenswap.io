import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import DetailList from 'components/DetailList';
import SelectPair from 'blocks/SelectPair';
import { openModalAction } from 'actions/modal';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import stellarLogo from 'assets/images/stellar.png';
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
  useEffect(() => {
    if (refHeight.current) {
      setHeight(refHeight.current.offsetHeight);
    }
    console.warn(height);
  }, [refHeight.current]);

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
              <OrderSection />
            </div>
          </div>
          {/* middle section */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 order-xl-2 order-lg-1 order-md-1 order-sm-1 order-1 c-col">
            <div className={classNames(styles.card, styles['card-chart'], 'mb-1')} ref={refHeight}>
              <ChartSection />
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
              <TradeSection />
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
