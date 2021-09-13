import React from 'react';
import classNames from 'classnames';
import { setCustomOrderPriceAction } from 'actions/customOrderPrice';
import sevenDigit from 'helpers/sevenDigit';
import BN from 'helpers/BN';
import { useDispatch } from 'react-redux';
import Tooltips from 'components/Tooltip';
import Image from 'next/image';
import styles from '../../styles.module.scss';
import avgPriceIcon from '../../../../assets/images/avg.price.png';

function generateProgressStyle(percent, isSell) {
  return `linear-gradient(to left, ${isSell ? '#f5dce6' : '#e8eedc'} ${percent}%, transparent 0%)`;
}

function generateHoverStyle() {
  return '#f5f5f7';
}

function SumTooltip({ data }) {
  return (
    <section className={styles['tooltip-container']}>
      <section className={styles.tooltip}>
        {data.map((info) => (
          <section key={info.text}>
            <span>{info.text}</span>
            <span>{info.number}</span>
          </section>
        ))}
      </section>
    </section>
  );
}

const OrderItem = ({
  row, isSell, hover, tooltipData, appSpotPair,
}) => {
  const dispatch = useDispatch();

  const tooltipInfo = [
    {
      text: 'Avg.price',
      number:
  <div className={styles['avg-info']}>
    <div className={styles['avg-icon']}>
      <Image
        width={8}
        height={6}
        src={avgPriceIcon}
      />
    </div>
    <span>{tooltipData.avg}</span>
  </div>
      ,
    },
    {
      text: `Sum ${appSpotPair.base.code}`,
      number: tooltipData.sum,
    },
    {
      text: `Sum ${appSpotPair.counter.code}`,
      number: tooltipData.total,
    }];

  return (
    <Tooltips
      id="order"
      placement="right"
      text={<SumTooltip data={tooltipInfo} />}
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
