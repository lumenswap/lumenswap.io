import CTable from 'components/CTable';
import minimizeAddress from 'helpers/minimizeAddress';
import { useState, useEffect } from 'react';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import { fetchTradeAPI } from 'api/stellar';
import getAssetDetails from 'helpers/getAssetDetails';
import NLSP from 'tokens/NLSP';
import humanAmount from 'helpers/humanAmount';
import moment from 'moment';
import LoadingWithContainer from '../../../components/LoadingWithContainer/LoadingWithContainer';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-container']}>
    <span>There is no trade</span>
  </div>
);

const tableHeaders = [
  {
    title: 'Buyer',
    dataIndex: 'buyer',
    key: 1,
    render: (data) => (
      <span className={styles.address}>
        <a href={generateAddressURL(data.base_is_seller ? data.counter_account : data.base_account)} target="_blank" rel="noreferrer">
          {minimizeAddress(data.base_is_seller ? data.counter_account : data.base_account)}
        </a>
      </span>
    ),
  },
  {
    title: 'Seller',
    dataIndex: 'seller',
    key: 2,
    render: (data) => (
      <span className={styles.address}>
        <a href={generateAddressURL(!data.base_is_seller ? data.counter_account : data.base_account)} target="_blank" rel="noreferrer">
          {minimizeAddress(!data.base_is_seller ? data.counter_account : data.base_account)}
        </a>
      </span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 3,
    render: (data) => <span>{humanAmount(data.counter_amount)} NLSP</span>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    render: (data) => <span>{moment(data.ledger_close_time).fromNow()}</span>,
  },
];

function TradesData({ lusiData }) {
  const [tradesData, setTradesData] = useState(null);

  useEffect(() => {
    fetchTradeAPI(
      getAssetDetails({ code: lusiData.assetCode, issuer: process.env.REACT_APP_LUSI_ISSUER }),
      getAssetDetails(NLSP), {
        limit: 10,
        order: 'desc',
      },
    )
      .then((res) => {
        setTradesData(res.data._embedded.records);
      })
      .catch(() => {
        setTradesData([]);
      });
  }, []);

  return (
    <div>
      <CTable
        columns={tableHeaders}
        noDataMessage={NoDataMessage}
        dataSource={tradesData}
        className={styles.table}
        loading={!tradesData}
        customLoading={LoadingWithContainer}
      />
    </div>
  );
}

export default TradesData;
