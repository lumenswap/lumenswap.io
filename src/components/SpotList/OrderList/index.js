import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from '../styles.module.scss';

const OrderList = ({
  headerItem, rowItem, gapInfo,
}) => {
  const randomProgress = () => Math.floor(Math.random() * 100) + 1;
  const isForSell = (status) => status === 'sell';
  const generateProgressStyle = (status) => `linear-gradient(to left, ${isForSell(status) ? '#f5dce6' : '#e8eedc'} ${randomProgress()}%, transparent 0%)`;
  return (
    <div className={styles['table-container']}>
      <div className={classNames(styles.heading, styles['table-row'])}>
        {headerItem.map((header, index) => (
          <div className={classNames(styles['row-item'], styles['order-header'])} key={index}>{header}</div>
        ))}
      </div>
      <div className={styles['table-body']}>
        {rowItem.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            <div
              className={classNames(styles.progress,
                isForSell(row.status) ? styles.sell : styles.buy)}
              style={{ background: generateProgressStyle(row.status) }}
            >
              <div className={styles['table-row']}>
                {row.data.map((item, index) => (
                  <div className={styles['row-item']} key={`item-${index}`}>{item}</div>
                ))}
              </div>
            </div>
            {(gapInfo.index - 1) === rowIndex && (
            <div className={styles.gap}>
              <span className={classNames(styles.total)}>{gapInfo.total}</span>
              <span className={styles.price}>{gapInfo.price}</span>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

OrderList.propTypes = {
  headerItem: PropTypes.array.isRequired,
  rowItem: PropTypes.array.isRequired,
  gapInfo: PropTypes.object.isRequired,
};

export default OrderList;
