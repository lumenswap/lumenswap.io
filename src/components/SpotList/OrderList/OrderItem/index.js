import React, { useState } from 'react';
import classNames from 'classnames';
import { setCustomOrderPriceAction } from 'actions/customOrderPrice';
import sevenDigit from 'helpers/sevenDigit';
import BN from 'helpers/BN';
import { useDispatch } from 'react-redux';
import Tooltips from 'components/Tooltip';
import Image from 'next/image';
import numeral from 'numeral';
import styles from '../../styles.module.scss';
import avgPriceIcon from '../../../../assets/images/avg.price.png';

function generateProgressStyle(percent, isSell) {
  return `linear-gradient(to left, ${isSell ? '#f5dce6' : '#e8eedc'} ${percent}%, transparent 0%)`;
}

function generateHoverStyle(percent, isSell) {
  return `linear-gradient(to left, ${isSell ? '#f5dce6' : '#e8eedc'} ${percent}%, #f5f5f7 0%)`;
}

function SumTooltip({ data }) {
  return (
    <section className={styles['tooltip-container']}>
      <section className={styles.tooltip}>
        {data.map((info) => (
          <section>
            <span>{info.text}</span>
            <span>{info.number}</span>
          </section>
        ))}
      </section>
    </section>
  );
}
function CalculateSumValues(values, key, key2) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    if (key2) {
      sum = new BN(sum).plus(values[i][key]).div(values[i][key2]);
    } else {
      sum = new BN(sum).plus(values[i][key]);
    }
  }

  return numeral(sevenDigit(sum.toFixed(7))).format('0.00a');
}

const OrderItem = ({
  row, isSell, hover, SumValues, assets,
}) => {
  const dispatch = useDispatch();

  const tooltipData = [
    {
      text: 'Avg.price',
      number: <div className={styles['avg-info']}>
        <div className={styles['avg-icon']}>
          <Image
            width={8}
            height={6}
            src={avgPriceIcon}
          />
        </div>
        <span>{numeral(sevenDigit(CalculateSumValues(SumValues, 'price') / SumValues.length)).format('0,0.[0000]')}</span>
      </div>,
    },
    {
      text: `Sum ${assets[1].substring(
        assets[1].indexOf('(') + 1,
        assets[1].lastIndexOf(')'),
      )}`,
      number: isSell ? CalculateSumValues(SumValues, 'amount') : CalculateSumValues(SumValues, 'amount', 'price'),
    },
    {
      text: `Sum ${assets[0].substring(
        assets[0].indexOf('(') + 1,
        assets[0].lastIndexOf(')'),
      )}`,
      number: CalculateSumValues(SumValues, 'total'),
    }];
  return (
    <Tooltips
      id="order"
      placement="right"
      text={<SumTooltip data={tooltipData} />}
    >
      <div
        className={classNames(styles.progress, isSell ? styles.sell : styles.buy)}
        style={{
          background: hover
            ? generateHoverStyle(row.percent, isSell) : generateProgressStyle(row.percent, isSell),
        }}
      >
        <div
          className={styles['table-row']}
          onClick={() => {
            dispatch(setCustomOrderPriceAction({
              sell: row.price,
              buy: row.price,
            }));
          // setHoveredItems(hoveredItems.slice(0, index));
          }}
        >
          <div className={styles['row-item']}>{sevenDigit(row.price)}</div>
          <div className={styles['row-item']}>{isSell ? sevenDigit(row.amount) : sevenDigit(new BN(row.amount).div(row.price).toFixed(7))}</div>
          <div className={styles['row-item']}>{sevenDigit(row.total.toFixed(7))}</div>
        </div>
      </div>
    </Tooltips>
  );
};

export default OrderItem;
