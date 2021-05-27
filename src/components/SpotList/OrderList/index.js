import { setCustomOrderPriceAction } from 'actions/customOrderPrice';
import classNames from 'classnames';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import styles from '../styles.module.scss';

const OrderList = ({
  headerItem, rowItem, isSell,
}) => (
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
      {rowItem.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`}>
          <div
            className={classNames(styles.progress,
              isSell ? styles.sell : styles.buy)}
          >
            <div
              className={styles['table-row']}
              onClick={() => {
                const data = {};
                if (isSell) {
                  data.sell = row.price;
                } else {
                  data.buy = row.price;
                }

                setCustomOrderPriceAction(data);
              }}
            >
              <div className={styles['row-item']}>{sevenDigit(row.price)}</div>
              <div className={styles['row-item']}>{sevenDigit(row.amount)}</div>
              <div className={styles['row-item']}>{sevenDigit(new BN(row.amount).times(row.price).toFixed(7))}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default OrderList;
