import classNames from 'classnames';
import BN from 'helpers/BN';
import { useState } from 'react';
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
  const [hoveredItems,
    setHoveredItems] = useState([]);

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
      {isSell && (
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
      )}
      <div className={styles['table-body']}>
        {forUsingData.map((row, rowIndex) => {
          let hover;
          if (hoveredItems.findIndex((i) => i === rowIndex + 1) !== -1) {
            hover = true;
          }

          return (
            <div
              onMouseOver={() => {
                const indexes = [];
                const fillIndexes = () => {
                  if (isSell) {
                    return rowItem.map(
                      (data, index) => indexes.push(index),
                    ).slice(rowIndex, rowItem.length);
                  }
                  return rowItem.map((data, index) => indexes.push(index)).slice(0, rowIndex + 1);
                };
                setHoveredItems(fillIndexes());
              }}
              onMouseLeave={() => {
                setHoveredItems([]);
              }}
              key={`row-${rowIndex}`}
            >
              <OrderItem
                SumValues={isSell
                  ? forUsingData.slice(rowIndex, rowItem.length)
                  : forUsingData.slice(0, rowIndex + 1)}
                assets={headerItem}
                row={row}
                isSell={isSell}
                hover={hover}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
