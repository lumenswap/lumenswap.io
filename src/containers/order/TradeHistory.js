import { fetchTradesOfAccount } from 'api/stellar';
import CTable from 'components/CTable';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import Loading from 'components/Loading';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>You have no trade history</div>
  </div>
);

function TradeHistory() {
  const [tableData, setTableData] = useState(null);
  const isLogged = useSelector((state) => state.user.logged);
  const userAddress = useSelector((state) => state.user.detail.address);

  useEffect(() => {
    function loadData() {
      fetchTradesOfAccount(userAddress, { limit: 200 }).then((res) => {
        setTableData(res.data._embedded.records.map((item) => {
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
    if (isLogged) {
      loadData();
    }
  }, [isLogged]);
  console.log(tableData);

  const tableHeaders = [
    {
      title: 'Date',
      dataIndex: 'time',
      key: '1',
      render: (data) => {
        const time = data.time.split(' ');
        return (
          <div className={styles.date}>
            <div className={styles['date-item']}>{time[0]}</div>
            <div className={styles['date-item']}>{time[2]}</div>
          </div>
        );
      },
    },
    {
      title: 'Sold',
      dataIndex: 'sellAmount',
      key: '2',
      render: (data) => (
        <div className={styles.sold}>
          <div className={styles.amount}>{data.sellAmount}</div> <div>{data.sellAsset}</div>
        </div>
      ),
    },
    {
      title: 'Bought',
      dataIndex: 'buyAmount',
      key: '3',
      render: (data) => (
        <div className={styles.sold}>
          <div className={styles.amount}>{data.buyAmount}</div>
          <div>{data.buyAsset}</div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: '4',
    },

  ];

  if (tableData === null) {
    return <div className={styles['loading-container']}><Loading size="48" /></div>;
  }
  return (
    <>
      <div style={{ marginLeft: '-24px' }}>
        <CTable
          className={styles.table}
          columns={tableHeaders}
          dataSource={tableData}
          noDataMessage={NoDataMessage}
        />
      </div>
    </>
  );
}

export default TradeHistory;
