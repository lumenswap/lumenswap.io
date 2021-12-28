import { fetchTradesOfAccount } from 'api/stellar';
import moment from 'moment';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BN from 'helpers/BN';
import CTable from 'components/CTable';
import humanAmount from 'helpers/humanAmount';
import FetchDataLoading from 'components/FetchDataLoading';
import styles from '../styles.module.scss';

const noDataComponent = () => (
  <p className={styles['centralize-content']}>
    You have not trade history
  </p>
);

export default function TradeHistory() {
  const [rowData, setRowData] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const intervalRef = useRef(null);

  const tableHeaders = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 1,
      render: (data) => (
        <div className={styles['td-outside']}>
          {data.time}
        </div>
      ),
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      key: 2,
      render: (data) => (
        <span>
          {data.sellAmount} {data.sellAsset}
        </span>
      ),
    },
    {
      title: 'Bought',
      dataIndex: 'bought',
      key: 3,
      render: (data) => (
        <span>
          {data.buyAmount} {data.buyAsset}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (data) => (
        <span className={styles['price-td']}>
          {data.price} {data.pair.counter} / {data.otherPrice} {data.pair.base}
        </span>
      ),
    },
  ];

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
          sellAmount = humanAmount(item.base_amount);

          buyAsset = item.counter_asset_code || 'XLM';
          buyAmount = humanAmount(item.counter_amount);
        } else {
          sellAsset = item.counter_asset_code || 'XLM';
          sellAmount = humanAmount(item.counter_amount);

          buyAsset = item.base_asset_code || 'XLM';
          buyAmount = humanAmount(item.base_amount);
        }

        return {
          time: moment(time.valueOf()).utc().format('MM-DD  hh:mm:ss'),
          price: humanAmount(price.toFixed(7)),
          otherPrice: humanAmount(otherPrice.toFixed(7)),
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
      intervalRef.current = setInterval(loadData, 2000);
      loadData();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [userAddress]);

  return (
    <div className={styles['container-table']}>
      <CTable
        className={styles.table}
        columns={tableHeaders}
        dataSource={rowData}
        customLoading={() => <FetchDataLoading />}
        loading={!rowData}
        noDataComponent={noDataComponent}
        rowFix={{
          rowHeight: 40,
          headerRowHeight: 40,
          rowNumbers: rowData?.length,
        }}
      />
    </div>
  );
}
