import { fetchOffersOfAccount } from 'api/stellar';
import Table from 'components/Table';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import moment from 'moment';
import { useRef, useEffect, useState } from 'react';
import StellarSDK from 'stellar-sdk';
import { useSelector } from 'react-redux';
import generateManageSellTRX from 'stellar-trx/generateManageSellTRX';
import store from 'store';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import FetchDataLoading from 'components/FetchDataLoading';
import styles from '../styles.module.scss';

const tableRows = (rows) => rows.map((row) => (
  <tr key={row.id}>
    <td className="color-gray">
      <div className={styles['td-outside']}>
        {row.time}
      </div>
    </td>
    <td>{row.sellAmount} {row.baseAsset.getCode()}</td>
    <td>{row.buyAmount} {row.counterAsset.getCode()}</td>
    <td>{row.price} {row.counterAsset.getCode()}/{row.otherPrice} {row.baseAsset.getCode()}</td>
    <td>
      <span
        onClick={async () => {
          function func() {
            const address = store.getState().user.detail.address;
            return generateManageSellTRX(
              address,
              row.counterAsset,
              row.baseAsset,
              '0',
              row.price,
              row.id,
            );
          }

          showGenerateTrx(func)
            .then(showSignResponse)
            .catch(console.error);
        }}
        style={{
          cursor: 'pointer',
          color: '#0e41f5',
        }}
      >
        Cancel
      </span>
    </td>
  </tr>
));

const tableHeader = ['Date', 'Sell', 'Buy', 'Price', 'Action'];

export default function OrderHistory({ setOrderCounter }) {
  const [rowData, setRowData] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const intervalRef = useRef(null);

  function loadData() {
    fetchOffersOfAccount(userAddress, { limit: 200 }).then((res) => {
      setOrderCounter(res.data._embedded.records.length);
      setRowData(res.data._embedded.records.map((item) => {
        const time = new Date(item.last_modified_time);
        const counterAsset = item.buying.asset_code
          ? new StellarSDK.Asset(item.buying.asset_code, item.buying.asset_issuer)
          : new StellarSDK.Asset.native();
        const baseAsset = item.selling.asset_code
          ? new StellarSDK.Asset(item.selling.asset_code, item.selling.asset_issuer)
          : new StellarSDK.Asset.native();
        const buyAmount = new BN(item.price).times(item.amount);

        return {
          time: moment(time.valueOf()).utc().format('MM-DD  hh:mm:ss'),
          sellAmount: sevenDigit(item.amount),
          buyAmount: sevenDigit(buyAmount.toString()),
          otherPrice: sevenDigit(new BN(item.amount).div(buyAmount).toString()),
          price: sevenDigit(item.price),
          counterAsset,
          baseAsset,
          id: item.id,
        };
      }));
    }).catch(console.error);
  }

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(loadData, 2000);
      loadData();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  if (rowData?.length === 0) {
    return (
      <p className={styles['centralize-content']}>
        You have no open orders
      </p>
    );
  }

  return (
    <div className={styles['container-table']}>
      {rowData === null ? <FetchDataLoading /> : (
        <Table
          tableRows={tableRows(rowData)}
          tableHead={tableHeader}
        />
      )}
    </div>
  );
}
