import classNames from 'classnames';
import Header from 'components/Header';
import OrderList from 'components/OrderList';
import styles from './styles.module.scss';

const orderListHeader = ['Price (USDC)', 'Amounr(XLM)', 'Total'];
const orderListItems = Array(34).fill({
  data: ['0.001238', '97', '0.12009'],
  progress: 1,
});

const Spot = () => (
  <div className="container-fluid">
    <Header />
    <div className="layout mt-4">
      <div className="row">
        <div className="col-xl-3 col-md-3 col-lg-6 col-md-6 col-sm-12 col-12">
          <div className={classNames(styles.card, styles['card-left'])}>
            <OrderList
              headerItem={orderListHeader}
              rowItem={orderListItems}
              gapInfo={{
                index: 18, status: 'sell', total: '0.001219', price: '$34.76',
              }}
            />
          </div>
        </div>
        <div className="col-xl-6 col-md-12">2</div>
        <div className="col-xl-3 col-md-3 col-lg-6 col-md-6 col-sm-12 col-12">1</div>
      </div>
    </div>
  </div>
);

export default Spot;
