import CTable from 'components/CTable';
import minimizeAddress from 'helpers/minimizeAddress';
import fetchNFTTrades from 'api/nftTradesAPI';
import numeral from 'numeral';
import { useState, useEffect } from 'react';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import LoadingWithContainer from './LoadingWithContainer';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-container']}>
    <span>There is no asset trade</span>
  </div>
);

const tableHeaders = [
  {
    title: 'Buyer',
    dataIndex: 'buyer',
    key: 1,
    render: (data) => (
      <span className={styles.address}>
        <a href={generateAddressURL(data.buyer)} target="_blank" rel="noreferrer">{minimizeAddress(data.buyer)}</a>
      </span>
    ),
  },
  {
    title: 'Seller',
    dataIndex: 'seller',
    key: 2,
    render: (data) => (
      <span className={styles.address}>
        <a href={generateAddressURL(data.seller)} target="_blank" rel="noreferrer">{minimizeAddress(data.seller)}</a>
      </span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 3,
    render: (data) => <span>{numeral(data.amount).format('0,0')} LSP</span>,
  },

];

function TradesData({ id }) {
  const [tradesData, setTradesData] = useState(null);

  useEffect(() => {
    fetchNFTTrades(id).then((data) => setTradesData(data));
  }, []);
  return (
    <div>
      {tradesData ? (
        <CTable
          columns={tableHeaders}
          noDataMessage={NoDataMessage}
          dataSource={tradesData}
          className={styles.table}
        />
      ) : <LoadingWithContainer />}

    </div>
  );
}

export default TradesData;
