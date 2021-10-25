import CTable from 'components/CTable';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import fetchNFTOffers from 'api/nftOffersAPI';
import moment from 'moment';
import numeral from 'numeral';
import { useState, useEffect } from 'react';
import LoadingWithContainer from './LoadingWithContainer';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-container']}>
    <span>There is no asset offer</span>
  </div>
);

const tableHeaders = [
  {
    title: 'Address',
    dataIndex: 'address',
    key: 1,
    render: (data) => (
      <span className={styles.address}>
        <a href={generateAddressURL(data.address)} target="_blank" rel="noreferrer">{minimizeAddress(data.address)}</a>
      </span>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 2,
    render: (data) => <span>{moment(data.time).fromNow()}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 3,
    render: (data) => <span>{numeral(data.amount).format('0,0')} LSP</span>,
  },

];

function OffersData({ id }) {
  const [offersData, setOffersData] = useState(null);

  useEffect(() => {
    fetchNFTOffers(id).then((data) => setOffersData(data));
  }, []);
  return (
    <div>
      {offersData ? (
        <CTable
          columns={tableHeaders}
          noDataMessage={NoDataMessage}
          dataSource={offersData}
          className={styles.table}
        />
      ) : <LoadingWithContainer />}

    </div>
  );
}

export default OffersData;
