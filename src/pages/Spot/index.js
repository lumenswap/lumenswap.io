import classNames from 'classnames';
import Header from 'components/Header';
import SpotList from 'components/SpotList';
import CustomTabs from 'components/CustomTabs';
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
const tradeListItems = Array(32).fill({
  data: ['0.001238', '92', '15:38:16'],
  status: 'buy',
});

// const tabData = [
//   { title: 'Market Trades', id: 'market', content: '' },
//   { title: 'My Trades', id: '', content: '' },
// ];

const Spot = () => (
  <div className="container-fluid">
    <Header />
    <div className="layout mt-4 other">
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-xl-1 order-lg-2 order-sm-2 order-2">
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
        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 order-xl-2 order-lg-1 order-md-1 order-sm-1 order-1">2</div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 order-3">
          <CustomTabs />
          <SpotList type="trade" headerItem={tradeListHeader} items={tradeListItems} />
        </div>
      </div>
    </div>
  </div>
);

export default Spot;
