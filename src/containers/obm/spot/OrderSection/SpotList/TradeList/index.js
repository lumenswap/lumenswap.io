import classNames from 'classnames';
import humanAmount from 'helpers/humanAmount';
import moment from 'moment';
import styles from '../styles.module.scss';

const TradeList = ({
  headerItem, rowItems,
}) => {
  if (!rowItems) {
    return null;
  }

  return (
    <div className={styles['table-container']} style={{ minHeight: 650 }}>
      <div className={classNames(styles.heading, styles['table-head'])}>
        {headerItem.map((header, index) => (
          <div className={classNames(styles['row-item'], styles['trade-header'])} key={index}>{header}</div>
        ))}
      </div>
      <div className={classNames(styles['table-body'], styles['table-trade'])}>
        {rowItems.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            <div className={classNames(row.base_is_seller ? styles.sell : styles.buy)}>
              <div className={styles['table-row']} style={{ cursor: 'auto' }}>
                <div className={styles['row-item']}>{humanAmount(row.counter_amount)}</div>
                <div className={styles['row-item']}>{humanAmount(row.base_amount)}</div>
                <div className={styles['row-item']}>{moment(row.time).format('hh:mm:ss')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeList;
