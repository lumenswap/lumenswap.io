import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const OrderList = ({ headerItem, rowItem, gapInfo }) => {
  const randomProgress = () => Math.floor(Math.random() * 100) + 1;
  return (
    <div className={styles['table-container']}>
      <div className={classNames(styles.heading, styles['table-row'])}>
        {headerItem.map((header, index) => (
          <div className={styles['row-item']} key={index}>{header}</div>
        ))}
      </div>
      <div className={styles['table-body']}>
        {rowItem.map((row, rowIndex) => (
          <>
            <div
              className={styles.progress}
              style={{ background: `linear-gradient(to left, #f5dce6 ${randomProgress()}%, transparent 0%)` }}
            >
              <div className={styles['table-row']} key={rowIndex}>
                {row.data.map((item, index) => (
                  <div className={styles['row-item']} key={index}>{item}</div>
                ))}
              </div>
            </div>
            {gapInfo.index === rowIndex
            && <div className={styles.gap}>this is gap</div>}
          </>
        ))}
      </div>
    </div>
  );
};

OrderList.propTypes = {
  headerItem: PropTypes.array.isRequired,
  rowItem: PropTypes.object.isRequired,
  gapInfo: PropTypes.object.isRequired,
};

export default OrderList;
