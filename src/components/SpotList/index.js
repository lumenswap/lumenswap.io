import OrderList from 'components/SpotList/OrderList';
import TradeList from 'components/SpotList/TradeList';
import styles from './styles.module.scss';

const SpotList = ({
  type, headerItem = [], items = [], gapInfo = {},
}) => (
  <div>
    {type === 'order' ? (
      <OrderList
        headerItem={headerItem}
        rowItem={items}
        gapInfo={gapInfo}
        styles={styles}
      />
    )
      : <TradeList headerItem={headerItem} rowItem={items} styles={styles} />}
  </div>
);

export default SpotList;
