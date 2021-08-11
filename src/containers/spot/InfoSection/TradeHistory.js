import { fetchTradesOfAccount } from 'api/stellar';
import Table from 'components/Table';
import moment from 'moment';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import FetchDataLoading from 'components/FetchDataLoading';
import styles from '../styles.module.scss';

const tableRows = (rows) => rows.map((row, index) => (
  <tr key={index}>
    <td className="color-gray">
      <div className={styles['td-outside']}>
        {row.time}
      </div>
    </td>
    <td>{row.sellAmount} {row.sellAsset}</td>
    <td>{row.buyAmount} {row.buyAsset}</td>
    <td>{row.price} {row.pair.counter} / {row.otherPrice} {row.pair.base}</td>
  </tr>
));

const tableHeader = ['Date', 'Sold', 'Bought', 'Price'];

export default function TradeHistory() {
  const [rowData, setRowData] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const intervalRef = useRef(null);

  function loadData() {
    fetchTradesOfAccount(userAddress, { limit: 200 }).then((res) => {
      setRowData(res.data._embedded.records.map((item) => {
        const time = new Date(item.ledger_close_time);
        const price = new BN(item.price.n).div(item.price.d);
        const otherPrice = new BN(item.price.d).div(item.price.n);
        let sellAsset;
        let buyAsset;
        let sellAmount;
        let buyAmount;
        if (item.base_account === userAddress) {
          sellAsset = item.base_asset_code || 'XLM';
          sellAmount = sevenDigit(item.base_amount);

          buyAsset = item.counter_asset_code || 'XLM';
          buyAmount = sevenDigit(item.counter_amount);
        } else {
          sellAsset = item.counter_asset_code || 'XLM';
          sellAmount = sevenDigit(item.counter_amount);

          buyAsset = item.base_asset_code || 'XLM';
          buyAmount = sevenDigit(item.base_amount);
        }

        return {
          time: moment(time.valueOf()).utc().format('MM-DD  hh:mm:ss'),
          price: sevenDigit(price.toFixed(7)),
          otherPrice: sevenDigit(otherPrice.toFixed(7)),
          sellAsset,
          buyAsset,
          sellAmount,
          buyAmount,
          pair: {
            counter: item.counter_asset_code || 'XLM',
            base: item.base_asset_code || 'XLM',
          },
        };
      }));
    });
  }

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(loadData, 5000);
      loadData();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [userAddress]);

  if (rowData?.length === 0) {
    return (
      <p className={styles['centralize-content']}>
        You have not trade history
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
