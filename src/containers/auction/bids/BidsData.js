import CTable from 'components/CTable';
import NoData from 'components/NoData';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getAuctionBids } from 'api/auction';
import BN from 'helpers/BN';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';
import { STATUS_NAMES } from '../consts/board';

function BidsData({
  page, setTotalPages, searchQuery, auction,
}) {
  const [bids, setBids] = useState(null);

  const filteredBids = bids && [...bids];

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
          {moment(data.bidDate).fromNow()}
        </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => (
        <span>
          {humanAmount(new BN(data.amount).div(10 ** 7).toFixed(7))} {auction.assetCode}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (data) => (
        <span>
          {data.price} XLM
        </span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 5,
      render: (data) => (
        <span>
          {humanAmount(new BN(data.total).div(10 ** 7).toFixed(7))} XLM
        </span>
      ),
    },
  ];

  useEffect(() => {
    setBids(null);
    if (auction.status === STATUS_NAMES['not-started']) {
      setBids([]);
      setTotalPages(1);
    } else {
      getAuctionBids(auction.id, { page, searchQuery }).then((data) => {
        setBids(data.data);
        setTotalPages(data.totalPages);
      });
    }
  }, [page, searchQuery]);

  return (
    <>
      <CTable
        columns={columns}
        noDataComponent={() => <NoData message="There is no bid" />}
        className={styles.table}
        dataSource={filteredBids}
        loading={!bids}
        rowFix={{
          rowHeight: 53,
          rowNumbers: 20,
          headerRowHeight: 40,
        }}
      />
    </>
  );
}

export default BidsData;
