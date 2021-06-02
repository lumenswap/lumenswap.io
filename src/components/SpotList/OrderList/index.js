import { setCustomOrderPriceAction } from 'actions/customOrderPrice';
import classNames from 'classnames';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import { useState } from 'react';
import styles from '../styles.module.scss';

function generateProgressStyle(percent, isSell) {
  return `linear-gradient(to left, ${isSell ? '#f5dce6' : '#e8eedc'} ${percent}%, transparent 0%)`;
}

function generateHoverStyle(percent, isSell) {
  return `linear-gradient(to left, ${isSell ? '#f5dce6' : '#e8eedc'} ${percent}%, #f5f5f7 0%)`;
}

const OrderList = ({
  headerItem, rowItem, isSell,
}) => {
  let forUsingData = rowItem.map((i) => ({
    ...i,
    total: new BN(i.amount).times(i.price),
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

  const orderItem = (row) => {
    const [hover, setHover] = useState(false);
    return (
      <div
        className={classNames(styles.progress, isSell ? styles.sell : styles.buy)}
        style={{
          background: hover
            ? generateHoverStyle(row.percent, isSell) : generateProgressStyle(row.percent, isSell),
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={styles['table-row']}
          onClick={() => {
            setCustomOrderPriceAction({
              sell: row.price,
              buy: row.price,
            });
          }}
        >
          <div className={styles['row-item']}>{sevenDigit(row.price)}</div>
          <div className={styles['row-item']}>{sevenDigit(new BN(row.amount).div(row.price).toFixed(7))}</div>
          <div className={styles['row-item']}>{sevenDigit(row.total.toFixed(7))}</div>
        </div>
      </div>
    );
  };

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
            {orderItem(row)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
