import React, { useEffect, useState } from 'react';
import CTable from 'components/CTable';
import NoData from 'components/NoData';

import fetchAuctionWinners from 'api/AuctionWinners';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import numeral from 'numeral';
import styles from './styles.module.scss';

const WinnersData = ({ searchQuery, tab, assetCode }) => {
  const [winners, setWinners] = useState(null);

  let filteredWinners = winners && [...winners];
  if (searchQuery) {
    if (tab === 'winner') {
      filteredWinners = filteredWinners?.filter((bid) => bid.address.search(searchQuery) !== -1);
    }
  }
  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 1,
      render: (data) => (
        <a href={generateAddressURL(data.address)} className={styles.link}>
          {minimizeAddress(data.address)}
        </a>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => (
        <span>
          {numeral(data.amount).format('0,0')} {data.amountAssetCode}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (data) => (
        <span>
          {data.price} {data.baseAssetCode}
        </span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 5,
      render: (data) => (
        <span>
          {numeral(data.total).format('0,0')} {data.baseAssetCode}
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchAuctionWinners(null, assetCode).then((data) => setWinners(data.winnersData));
  }, []);

  return (
    <CTable
      columns={columns}
      noDataMessage={() => <NoData message="There is no winner" />}
      className={styles.table}
      dataSource={filteredWinners?.slice(0, 6)}
      loading={!winners}
    />
  );
};

export default WinnersData;
