import React, { useEffect, useState } from 'react';
import CTable from 'components/CTable';
import NoData from 'components/NoData';
import fetchAuctionBids from 'api/AuctionBids';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import numeral from 'numeral';
import styles from './styles.module.scss';

const BidsData = ({ searchQuery, tab, assetCode }) => {
  const [bids, setBids] = useState(null);

  let filteredBids = bids && [...bids];
  if (searchQuery) {
    if (tab === 'bid') {
      filteredBids = filteredBids?.filter((bid) => bid.address.search(searchQuery) !== -1);
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
      title: 'Date',
      dataIndex: 'data',
      key: 2,
      render: (data) => (
        <span>
          {moment(data.date).fromNow()}
        </span>
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
    fetchAuctionBids(null, assetCode).then((data) => setBids(data.bidsData));
  }, []);

  return (
    <CTable
      columns={columns}
      noDataMessage={() => <NoData message="There is no bid" />}
      className={styles.table}
      dataSource={filteredBids?.slice(0, 6)}
      loading={!bids}
    />
  );
};

export default BidsData;
