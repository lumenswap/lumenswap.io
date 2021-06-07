import classNames from 'classnames';
import BN from 'helpers/BN';
import OrderItem from './OrderItem';
import styles from '../styles.module.scss';

function calculateAmountAndTotal(isSell, i) {
  if (isSell) {
    return {
      innerAmount: new BN(i.amount),
      total: new BN(i.amount).times(i.price),
    };
  }

  return {
    innerAmount: new BN(i.amount).div(i.price).toFixed(7),
    total: new BN(i.amount),
  };
}

const OrderList = ({
  headerItem, rowItem, isSell,
}) => {
  let forUsingData = rowItem.map((i) => ({
    ...i,
    ...calculateAmountAndTotal(isSell, i),
  }));
  const maxNumber = forUsingData.sort((a, b) => -1 * new BN(a.total).comparedTo(b.total))[0]?.total;
  forUsingData = forUsingData.map((i) => ({
    ...i,
    percent: i.total.div(maxNumber).times(100).toFixed(0),
  }));

  if (isSell) {
    forUsingData = forUsingData.sort((a, b) => -1 * new BN(a.price).comparedTo(b.price));
  } else {
    forUsingData = forUsingData.sort((a, b) => -1 * new BN(a.price).comparedTo(b.price));
  }

  return (
    <div className={styles['table-container']}>
      <div className={classNames(styles.heading, styles['table-head'])} style={{ cursor: 'default' }}>
        {headerItem.map((header, index) => (
          <div
            className={classNames(styles['row-item'], styles['order-header'])}
            key={index}
          >
            {header}
          </div>
        ))}
      </div>
      <div className={styles['table-body']}>
        {forUsingData.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            <OrderItem row={row} isSell={isSell} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
