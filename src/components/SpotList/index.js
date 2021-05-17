import OrderList from 'components/SpotList/OrderList';
import TradeList from 'components/SpotList/TradeList';
import classNames from 'classnames';
import styles from './styles.module.scss';

const SpotList = ({
  type, headerItem = [], items = [], gapInfo = {},
}) => (
  <div>
    {type === 'order' ? (
      <>
        <OrderList
          headerItem={headerItem}
          rowItem={items?.asks || []}
          isSell
        />
        <div className={styles.gap}>
          <span className={classNames(styles.total)}>{gapInfo.total}</span>
          <span className={styles.price}>{gapInfo.price}</span>
        </div>
        <OrderList
          headerItem={headerItem}
          rowItem={items?.bids || []}
          isSell={false}
        />
      </>
    )
      : <TradeList headerItem={headerItem} rowItems={items} />}
  </div>
);

export default SpotList;
