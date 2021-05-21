import OrderList from 'components/SpotList/OrderList';
import classNames from 'classnames';
import styles from './styles.module.scss';

export default function LeftSideAppLumen({
  asks = [], bids = [], info, headerItem,
}) {
  const newAsk = asks.slice().reverse();

  return (
    <>
      <OrderList
        headerItem={headerItem}
        rowItem={newAsk}
        isSell
      />
      <div className={styles.gap}>
        <span className={classNames(styles.total)}>{info}</span>
        {/* <span className={styles.price}>{gapInfo.price}</span> */}
      </div>
      <OrderList
        headerItem={headerItem}
        rowItem={bids}
        isSell={false}
      />
    </>
  );
}
