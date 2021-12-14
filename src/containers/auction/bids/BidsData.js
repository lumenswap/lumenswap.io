import CTable from 'components/CTable';
import NoData from 'components/NoData';
import numeral from 'numeral';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import { useEffect, useState } from 'react';
import fetchAuctionBids from 'api/AuctionBids';
import styles from './styles.module.scss';

function BidsData({
  page, setTotalPages, searchQuery, assetCode, tab,
}) {
  const [bids, setBids] = useState(null);

  let filteredBids = bids && [...bids];

  if (searchQuery) {
    if (tab === 'bids') {
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
    setBids(null);
    const query = { currentPage: page, number: 10 };
    fetchAuctionBids(query, assetCode).then((data) => {
      setBids(data.bidsData);
      setTotalPages(data.totalPages);
    });
  }, [page]);

  return (
    <>
      <CTable
        columns={columns}
        noDataMessage={() => <NoData message="There is no bid" />}
        className={styles.table}
        dataSource={filteredBids}
        loading={!bids}
      />
    </>
  );
}

export default BidsData;
