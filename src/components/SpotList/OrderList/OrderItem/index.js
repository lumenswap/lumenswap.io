import React, { useState } from 'react';
import classNames from 'classnames';
import { setCustomOrderPriceAction } from 'actions/customOrderPrice';
import sevenDigit from 'helpers/sevenDigit';
import BN from 'helpers/BN';
import styles from '../../styles.module.scss';

function generateProgressStyle(percent, isSell) {
  return `linear-gradient(to left, ${isSell ? '#f5dce6' : '#e8eedc'} ${percent}%, transparent 0%)`;
}

function generateHoverStyle(percent, isSell) {
  return `linear-gradient(to left, ${isSell ? '#f5dce6' : '#e8eedc'} ${percent}%, #f5f5f7 0%)`;
}

const OrderItem = ({ row, isSell }) => {
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

export default OrderItem;
