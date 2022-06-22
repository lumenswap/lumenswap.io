import CTable from 'components/CTable';
import minimizeAddress from 'helpers/minimizeAddress';
import { useState, useEffect } from 'react';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import { fetchTradeAPI } from 'api/stellar';
import { getAssetDetails, getSingleToken } from 'helpers/asset';
import humanizeAmount from 'helpers/humanizeAmount';
import moment from 'moment';
import useDefaultTokens from 'hooks/useDefaultTokens';
import LoadingWithContainer from './LoadingWithContainer/LoadingWithContainer';
import styles from './styles.module.scss';

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
    render: (data) => <span>{humanizeAmount(data.counter_amount)} NLSP</span>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    render: (data) => <span>{moment(data.ledger_close_time).fromNow()}</span>,
  },
];

function TradesData({ lusiData }) {
  const [tradesData, setTradesData] = useState(null);
  const defaultTokens = useDefaultTokens();

  useEffect(() => {
    fetchTradeAPI(
      getAssetDetails({ code: lusiData.assetCode, issuer: process.env.REACT_APP_LUSI_ISSUER }),
      getAssetDetails(getSingleToken('NLSP', defaultTokens)), {
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
        noDataMessage="There is no trade"
        dataSource={tradesData}
        className={styles.table}
        loading={!tradesData}
        customLoading={LoadingWithContainer}
      />
    </div>
  );
}

export default TradesData;
