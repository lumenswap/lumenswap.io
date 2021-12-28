import { fetchOffersOfAccount } from 'api/stellar';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import moment from 'moment';
import { useRef, useEffect, useState } from 'react';
import StellarSDK from 'stellar-sdk';
import { useSelector } from 'react-redux';
import generateManageSellTRX from 'stellar-trx/generateManageSellTRX';
import BN from 'helpers/BN';
import humanAmount from 'helpers/humanAmount';
import FetchDataLoading from 'components/FetchDataLoading';
import { initializeStore } from 'store';
import CTable from 'components/CTable';
import styles from '../styles.module.scss';

const noDataComponent = () => (
  <p className={styles['centralize-content']}>
    You have no open orders
  </p>
);

export default function OrderHistory({ setOrderCounter }) {
  const [rowData, setRowData] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const intervalRef = useRef(null);

  const tableHeaders = [
    {
      title: 'Date',
      key: 1,
      dataIndex: 'date',
      render: (data) => (
        <span className={styles['td-outside']}>
          {data.time}
        </span>
      ),
    },
    {
      title: 'Sell',
      key: 2,
      dataIndex: 'sell',
      render: (data) => <span>{data.sellAmount} {data.baseAsset.getCode()}</span>,
    },
    {
      title: 'Buy',
      key: 3,
      dataIndex: 'buy',
      render: (data) => <span>{data.buyAmount} {data.counterAsset.getCode()}</span>,
    },
    {
      title: 'Price',
      key: 4,
      dataIndex: 'price',
      render: (data) => (
        <span>
          {data.price} {data.counterAsset.getCode()} / {data.otherPrice} {data.baseAsset.getCode()}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 5,
      dataIndex: 'action',
      render: (data) => (
        <span
          onClick={async () => {
            const store = initializeStore();
            function func() {
              const address = store.getState().user.detail.address;
              return generateManageSellTRX(
                address,
                data.counterAsset,
                data.baseAsset,
                '0',
                '1',
                data.id,
              );
            }

            showGenerateTrx(func, store.dispatch)
              .then((trx) => showSignResponse(trx, store.dispatch))
              .catch(console.error);
          }}
          style={{
            cursor: 'pointer',
            color: '#0e41f5',
          }}
        >
          Cancel
        </span>
      ),
    },
  ];

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
          sellAmount: humanAmount(item.amount),
          buyAmount: humanAmount(buyAmount.toString()),
          otherPrice: humanAmount(new BN(item.amount).div(buyAmount).toString()),
          price: humanAmount(item.price),
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
