import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import DetailList from 'components/DetailList';
import SelectOption from 'components/SelectOption';
import stellarLogo from 'assets/images/stellar.png';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import InfoSection from './InfoSection';
import OrderSection from './OrderSection';
import TradeSection from './TradeSection';
import OrderFormSection from './OrderFormSection';
import ChartSection from './ChartSection';
import styles from './styles.module.scss';
import { openModalAction } from '../../actions/modal';
import AddCustomPair from '../../blocks/AddCustomPair';

const details = [
  { title: '24 Change', value: '0.0432+7.45%', status: 'buy' },
  { title: '24 High', value: '2315.07' },
  { title: '24 Low', value: '2315.07' },
  { title: '24 Volume (XLM)', value: '2315.07' },
  { title: '24 Volume (USDC)', value: '2315.07' },
  { title: 'USDC asset issuer', value: 'GACJOH..LPSDVK' },
  { title: 'USDC asset issuer', value: 'GACPKH..LKELVK' },
];

const option = (label) => <div className={styles['select-logo']}><img src={usdLogo} alt="" /><img src={stellarLogo} alt="" />{label}</div>;

const selectOptions = [
  { label: option('USDC/XLM'), value: 'usdc' },
  { label: option('TEST/TEST'), value: 'test' },
];

const Spot = () => {
  const [select, setSelect] = useState(null);
  const [open, toggleModal] = useState(false);
  console.warn(select);

  useEffect(() => {
    if (open) {
      openModalAction({
        modalProps: { title: 'Add custom pair' },
        content: <AddCustomPair />,
      });
    }
  }, [open]);
  return (
    <div className="container-fluid">
      <Header />
      <div className="layout mt-4 other">
        {/* top section */}
        <div className={classNames('row', styles.row)}>
          <div className="col-3 c-col">
            <div className={classNames(styles.card, styles['card-select'])}>
              <div className={styles['container-select']}>
                <SelectOption items={selectOptions} width="100%" height="50px" setValue={setSelect} />
              </div>
            </div>
          </div>
          <div className="col-9 c-col">
            <div className={classNames(styles.card, styles['card-detail'])}>
              <DetailList list={details} />
            </div>
          </div>
        </div>
        <div className={classNames('row', styles.row)}>
          {/* order section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-xl-1 order-lg-2 order-sm-2 order-2 c-col">
            <div className={classNames(styles.card, styles['card-left'])}>
              <OrderSection />
            </div>
          </div>
          {/* middle section */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 order-xl-2 order-lg-1 order-md-1 order-sm-1 order-1 c-col">
            <div className={classNames(styles.card, styles['card-chart'], 'mb-1')}>
              <ChartSection />
              <button type="button" className="btn btn-dark" onClick={() => toggleModal(!open)}>modal</button>
            </div>
            <div className={classNames(styles.card, styles['card-input'], 'mb-1')}>
              <OrderFormSection />
            </div>
          </div>
          {/* trade section */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-3 c-col">
            <div className={classNames(styles.card, styles['card-right'])}>
              <TradeSection />
            </div>
          </div>
        </div>
        {/* end section */}
        <div className={classNames('row', styles.row)}>
          <div className="col-12 c-col">
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
