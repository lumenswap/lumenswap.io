import classNames from 'classnames';
import FetchDataLoading from 'components/FetchDataLoading';
import OrderList from './OrderList';
import styles from './styles.module.scss';

export default function LeftSideAppLumen({
  asks, bids, info, headerItem, appSpotPair,
}) {
  return (
    <div style={{ minHeight: 705 }}>
      {(asks === undefined || bids === undefined)
        ? (
          <div>
            <OrderList
              headerItem={headerItem}
              rowItem={[]}
              isSell={false}
              appSpotPair={appSpotPair}
            />
            <FetchDataLoading />
          </div>
        )
        : (
          <div>
            <OrderList
              headerItem={headerItem}
              rowItem={asks}
              isSell
              appSpotPair={appSpotPair}
            />
            <div className={styles.gap}>
              <span className={classNames(styles.total)}>{info}</span>
              {/* <span className={styles.price}>{gapInfo.price}</span> */}
            </div>
            <OrderList
              headerItem={[]}
              rowItem={bids}
              isSell={false}
              appSpotPair={appSpotPair}
            />
          </div>
        )}
    </div>
  );
}
