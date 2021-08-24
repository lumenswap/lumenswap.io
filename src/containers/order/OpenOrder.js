import CTable from 'components/CTable';
import { fetchOffersOfAccount } from 'api/stellar';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import StellarSDK from 'stellar-sdk';
import { useSelector } from 'react-redux';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import Loading from 'components/Loading';
import { initializeStore } from 'store';
import generateManageSellTRX from 'stellar-trx/generateManageSellTRX';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}> You have no open orders</div>
  </div>
);

function cancelSingleOder(data, setOpenOrderList) {
  return async () => {
    const store = initializeStore();
    function func() {
      const address = store.getState().user.detail.address;
      return generateManageSellTRX(
        address,
        data.counterAsset,
        data.baseAsset,
        '0',
        data.price,
        data.id,
      );
    }

    showGenerateTrx(func, store.dispatch)
      .then((trx) => showSignResponse(trx, store.dispatch))
      .then(() => {
        setOpenOrderList(null);
      })
      .catch(console.error);
  };
}

function OpenOrder({ openOrderList, setOpenOrderList }) {
  const userAddress = useSelector((state) => state.user.detail.address);
  const isLogged = useSelector((state) => state.user.logged);

  const loadData = useCallback(() => {
    fetchOffersOfAccount(userAddress, { limit: 200 }).then((res) => {
      setOpenOrderList(res.data._embedded.records.map((item) => {
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
  }, []);

  useEffect(() => {
    if (isLogged && openOrderList === null) {
      loadData();
    }
  }, [isLogged, openOrderList]);

  const tableHeaders = [
    {
      title: 'Date',
      dataIndex: 'time',
      key: '1',
      render: (data) => {
        const time = data.time.split(' ');
        return (
          <div className={styles.date}>
            <span className={styles['date-item']}>{time[0]}</span>
            <span className={styles['date-item']}>{time[2]}</span>
          </div>
        );
      },
    },
    {
      title: 'Sell',
      dataIndex: 'sellAmount',
      key: '2',
      render: (data) => `${data.sellAmount} ${data.baseAsset.getCode()}`,
    },
    {
      title: 'Buy',
      dataIndex: 'buyAmount',
      key: '3',
      render: (data) => `${data.buyAmount} ${data.counterAsset.getCode()}`,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: '4',
      render: (data) => `${data.price} ${data.counterAsset.getCode()} / ${data.otherPrice} ${data.baseAsset.getCode()}`,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: '5',
      render: (data) => (
        <span
          className={styles.cancel}
          onClick={cancelSingleOder(data, setOpenOrderList)}
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

  if (openOrderList === null) {
    return <div className={styles['loading-container']}><Loading size={48} /></div>;
  }

  return (
    <>
      <div style={{ marginLeft: '-24px' }}>
        <CTable
          className={styles.table}
          columns={tableHeaders}
          dataSource={openOrderList}
          noDataMessage={NoDataMessage}
        />
      </div>
    </>
  );
}

export default OpenOrder;
