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
import styles from '../styles.module.scss';

const tableRows = (rows) => rows.map((row, index) => (
  <tr key={index}>
    <td className="color-gray">
      <div className={styles['td-outside']}>
        {row.time}
      </div>
    </td>
    <td>{row.pair}</td>
    {/* <td className={`color-${row.isSell
    ? 'sell' : 'buy'}`}>{row.isSell ? 'Sell' : 'Buy'}</td> */}
    <td>{row.price} {row.counterAsset.getCode()}</td>
    <td>{row.amount} {row.baseAsset.getCode()}</td>
    <td>{row.total} {row.counterAsset.getCode()}</td>
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
        style={{ cursor: 'pointer' }}
      >
        Cancel
      </span>
    </td>
  </tr>
));

const tableHeader = ['Date', 'Pair', 'Price', 'Amount', 'Total', 'Action'];

export default function OrderHistory() {
  const [rowData, setRowData] = useState([]);
  const userAddress = useSelector((state) => state.user.detail.address);
  const intervalRef = useRef(null);

  function loadData() {
    fetchOffersOfAccount(userAddress, { limit: 200 }).then((res) => {
      setRowData(res.data._embedded.records.map((item) => {
        const time = new Date(item.last_modified_time);
        const total = new BN(item.price).times(item.amount);
        const counterAsset = item.buying.asset_code
          ? new StellarSDK.Asset(item.buying.asset_code, item.buying.asset_issuer)
          : new StellarSDK.Asset.native();
        const baseAsset = item.selling.asset_code
          ? new StellarSDK.Asset(item.selling.asset_code, item.selling.asset_issuer)
          : new StellarSDK.Asset.native();

        return {
          time: moment(time.valueOf()).utc().format('MM-DD  hh:mm:ss'),
          pair: `${item.selling.asset_code || 'XLM'}/${item.buying.asset_code || 'XLM'}`,
          isSell: true,
          price: sevenDigit(item.price),
          amount: sevenDigit(item.amount),
          counterAsset,
          baseAsset,
          total: sevenDigit(total.toString()),
          id: item.id,
        };
      }));
    });
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

  return (
    <div className={styles['container-table']}>
      <Table
        tableRows={tableRows(rowData)}
        tableHead={tableHeader}
      />
    </div>
  );
}
