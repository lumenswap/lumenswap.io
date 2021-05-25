import { fetchTradesOfAccount } from 'api/stellar';
import Table from 'components/Table';
import moment from 'moment';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
    <td className={`color-${row.isSell ? 'sell' : 'buy'}`}>{row.isSell ? 'Sell' : 'Buy'}</td>
    <td>{row.price} {row.counterAsset}</td>
    <td>{row.amount} {row.baseAsset}</td>
    <td width="30%">{row.total} {row.counterAsset}</td>
  </tr>
));

const tableHeader = ['Date', 'Pair', 'Side', 'Price', 'Amount', 'Total'];

export default function TradeHistory() {
  const [rowData, setRowData] = useState([]);
  const userAddress = useSelector((state) => state.user.detail.address);
  const intervalRef = useRef(null);

  function loadData() {
    fetchTradesOfAccount(userAddress, { limit: 200 }).then((res) => {
      setRowData(res.data._embedded.records.map((item) => {
        const time = new Date(item.ledger_close_time);
        const isSell = (item.base_account === userAddress && item.base_is_seller)
            || (item.counter_account === userAddress && !item.base_is_seller);
        const price = new BN(item.price.n).div(item.price.d);

        return {
          time: moment(time.valueOf()).utc().format('MM-DD  hh:mm:ss'),
          pair: `${item.base_asset_code || 'XLM'}/${item.counter_asset_code || 'XLM'}`,
          isSell,
          price: sevenDigit(price.toFixed(7)),
          amount: sevenDigit(item.base_amount),
          counterAsset: item.counter_asset_code || 'XLM',
          baseAsset: item.base_asset_code || 'XLM',
          total: sevenDigit(item.counter_amount),
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
  }, [userAddress]);

  return (
    <div className={styles['container-table']}>
      <Table
        tableRows={tableRows(rowData)}
        tableHead={tableHeader}
      />
    </div>
  );
}
