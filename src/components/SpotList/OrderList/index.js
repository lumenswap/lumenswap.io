import classNames from 'classnames';
import BN from 'helpers/BN';
import { useState } from 'react';
import numeral from 'numeral';
import humanAmount from 'helpers/humanAmount';
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
  headerItem, rowItem, isSell, appSpotPair,
}) => {
  const [tooltipData, setTooltipData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState();

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

  const handleMouseHover = (rowIndex) => {
    let filteredRows = forUsingData.slice(0, rowIndex + 1);

    if (isSell) {
      filteredRows = forUsingData.slice(rowIndex);
    }
    let avg = 0;
    let sum = 0;
    let total = 0;
    for (const item of filteredRows) {
      avg = new BN(avg).plus(item.price);
      if (isSell) {
        sum = new BN(sum).plus(item.amount);
      } else {
        sum = new BN(sum).plus(item.innerAmount);
      }
      total = new BN(total).plus(item.total);
    }
    setTooltipData({
      avg: numeral(humanAmount(new BN(avg).dividedBy(filteredRows.length))).format('0,0.[0000]'),
      sum: numeral(humanAmount(sum.toFixed(7))).format('0.00a'),
      total: numeral(humanAmount(total.toFixed(7))).format('0.00a'),
    });
    setHoveredIndex(rowIndex);
  };

  const handleMouseLeave = () => {
    setTooltipData([]);
    setHoveredIndex();
  };

  const handleOrderItemHover = (rowIndex) => {
    let hover;
    if (isSell) {
      if (rowIndex >= hoveredIndex) {
        hover = true;
      }
    } else if (rowIndex <= hoveredIndex) {
      hover = true;
    }
    return hover;
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
          <div
            onMouseOver={() => { handleMouseHover(rowIndex); }}
            onMouseLeave={handleMouseLeave}
            key={`row-${rowIndex}`}
          >
            <OrderItem
              tooltipData={tooltipData}
              row={row}
              isSell={isSell}
              hover={handleOrderItemHover(rowIndex)}
              appSpotPair={appSpotPair}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
