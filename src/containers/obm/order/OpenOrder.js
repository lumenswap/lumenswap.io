import CTable from 'components/CTable';
import { fetchOffersOfAccount } from 'api/stellar';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import StellarSDK from 'stellar-sdk';
import { useSelector } from 'react-redux';
import BN from 'helpers/BN';
import humanizeAmount from 'helpers/humanizeAmount';
import { initializeStore } from 'store';
import generateManageSellTRX from 'stellar-trx/generateManageSellTRX';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import styles from './styles.module.scss';

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
        '0.1',
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
          time: time.getTime(),
          sellAmount: humanizeAmount(item.amount),
          buyAmount: humanizeAmount(buyAmount.toString()),
          otherPrice: humanizeAmount(new BN(item.amount).div(buyAmount).toString()),
          price: humanizeAmount(item.price),
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
      render: (data) => (
        <span className={styles['date-table']}>{moment(data.time).fromNow()}</span>
      ),
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

  return (
    <>
      <div style={{ marginLeft: '-24px' }}>
        <CTable
          className={styles.table}
          columns={tableHeaders}
          dataSource={openOrderList}
          loading={openOrderList === null}
          noDataMessage="You have no open orders"
        />
      </div>
    </>
  );
}

export default OpenOrder;
