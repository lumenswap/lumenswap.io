import { useState } from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import SpotList from 'components/SpotList';
import CustomTabs from 'components/CustomTabs';
import DetailList from 'components/DetailList';
import Table from 'components/Table';
import ButtonGroup from 'components/ButtonGroup';
import Checkbox from 'components/Checkbox';
import styles from './styles.module.scss';

const orderListHeader = ['Price (USDC)', 'Amounr(XLM)', 'Total'];
const orderListItems = Array(17).fill({
  data: ['0.001238', '97', '0.12009'],
  progress: 1,
  status: 'sell',
}).concat(Array(17).fill(
  {
    data: ['0.001238', '92', '0.12009'],
    progress: 1,
    status: 'buy',
  },
));

const tradeListHeader = ['Price (USDC)', 'Amounr(XLM)', 'Time'];
const tradeListItems = Array(37).fill({
  data: ['0.001238', '92', '15:38:16'],
  status: 'buy',
});

const tabData = [
  { title: 'Market Trades', id: 'one', content: <div className={styles['trade-container']}><SpotList type="trade" headerItem={tradeListHeader} items={tradeListItems} /></div> },
  { title: 'My Trades', id: 'two', content: 'You have no trades' },
];

const details = [
  { title: '24 Change', value: '0.0432+7.45%', status: 'buy' },
  { title: '24 High', value: '2315.07' },
  { title: '24 Low', value: '2315.07' },
  { title: '24 Volume (XLM)', value: '2315.07' },
  { title: '24 Volume (USDC)', value: '2315.07' },
  { title: 'USDC asset issuer', value: 'GACJOH..LPSDVK' },
  { title: 'USDC asset issuer', value: 'GACPKH..LKELVK' },
];

const tableHeader = ['Date', 'Pair', 'Side', 'Price', 'Amount', 'Total'];
const tableRows = () => [0, 1, 2].map((row, index) => (
  <tr key={index}>
    <td className="color-gray">
      <div className={styles['td-outside']}>
        04-23  13:43:21
      </div>
    </td>
    <td>USDC/XLM</td>
    <td className="color-sell">Sell</td>
    <td>0.50123</td>
    <td>$130</td>
    <td width="30%">20 USDT</td>
  </tr>
));

const buttonGroupItems = [
  { label: '1 Day', value: '1' },
  { label: '1 Week', value: '7' },
  { label: '1 Month', value: '30' },
  { label: '3 Month', value: '90' },
];

const filterTable = (
  <>
    <ButtonGroup
      buttons={buttonGroupItems}
      activeIndex={0}
      setValue={(v) => { console.log(v); }}
    />
    <div className={styles['container-table']}>
      <Table tableRows={tableRows()} tableHead={tableHeader} />
    </div>
  </>
);

const historyTab = [
  { title: 'Open orders', id: 'order', content: filterTable },
  { title: 'Trade History', id: 'trade', content: filterTable },
];

const Spot = () => {
  const [checked, setCheckbox] = useState(false);
  return (
    <div className="container-fluid">
      <Header />
      <div className="layout mt-4 other">
        {/* top section */}
        <div className={classNames('row', styles.row)}>
          <div className="col-3">
            <div className={styles.card} />
          </div>
          <div className="col-9 c-col">
            <div className={classNames(styles.card, styles['card-detail'])}>
              <DetailList list={details} />
            </div>
          </div>
        </div>
        {/* middle section */}
        <div className={classNames('row', styles.row)}>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-xl-1 order-lg-2 order-sm-2 order-2 c-col">
            <div className={classNames(styles.card, styles['card-left'])}>
              <SpotList
                type="order"
                headerItem={orderListHeader}
                items={orderListItems}
                gapInfo={{
                  index: 17, status: 'buy', total: '0.001219', price: '$34.76',
                }}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 order-xl-2 order-lg-1 order-md-1 order-sm-1 order-1 c-col">2</div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-3 c-col">
            <div className={classNames(styles.card, styles['card-right'])}>
              <CustomTabs tabs={tabData} activeTabId={tabData[0].id} fontSize={12} />
            </div>
          </div>
        </div>
        {/* end section */}
        <div className={classNames('row', styles.row)}>
          <div className="col-12 c-col">
            <div className={classNames(styles.card, styles['card-table'])}>
              <div className={styles['container-checkbox']}>
                <Checkbox
                  checked={checked}
                  onChange={() => setCheckbox(!checked)}
                  size={15}
                  label="Hide other pairs"
                />
              </div>
              <CustomTabs tabs={historyTab} activeTabId={historyTab[0].id} fontSize={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spot;
