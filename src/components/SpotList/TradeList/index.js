import classNames from 'classnames';
import PropTypes from 'prop-types';

const TradeList = ({
  headerItem, rowItem, styles,
}) => {
  const isForSell = (status) => status === 'sell';
  return (
    <div className={styles['table-container']}>
      <div className={classNames(styles.heading, styles['table-row'])}>
        {headerItem.map((header, index) => (
          <div className={classNames(styles['row-item'], styles['trade-header'])} key={index}>{header}</div>
        ))}
      </div>
      <div className={styles['table-body']}>
        {rowItem.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            <div className={classNames(isForSell(row.status) ? styles.sell : styles.buy)}>
              <div className={styles['table-row']}>
                {row.data.map((item, index) => (
                  <div className={styles['row-item']} key={`item-${index}`}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TradeList.propTypes = {
  headerItem: PropTypes.array.isRequired,
  rowItem: PropTypes.array.isRequired,
};

export default TradeList;
