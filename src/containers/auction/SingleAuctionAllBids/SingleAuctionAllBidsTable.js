import CTable from 'components/CTable';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getAuctionBids } from 'api/auction';
import BN from 'helpers/BN';
import humanizeAmount from 'helpers/humanizeAmount';
import { STATUS_NAMES } from 'containers/auction/consts';
import styles from './styles.module.scss';

function SingleAuctionAllBidsTable({
  page, setTotalPages, searchQuery, auction, sortBy,
}) {
  const [auctionAllBids, setAuctionAllBids] = useState(null);

  const filteredBids = auctionAllBids && [...auctionAllBids];

  const auctionAllBidsHeaders = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 1,
      render: (bid) => (
        <a
          target="_blank"
          rel="noreferrer"
          href={generateAddressURL(bid.address)}
          className={styles.link}
        >
          {minimizeAddress(bid.address)}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'data',
      key: 2,
      render: (bid) => (
        <span>
          {moment(bid.bidDate).fromNow()}
        </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (bid) => (
        <span>
          {humanizeAmount(new BN(bid.amount).div(10 ** 7).toFixed(7))} {auction.assetCode}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (bid) => (
        <span>
          {humanizeAmount(bid.price)} XLM
        </span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 5,
      render: (bid) => (
        <span>
          {humanizeAmount(new BN(bid.total).div(10 ** 7).toFixed(7))} XLM
        </span>
      ),
    },
  ];

  useEffect(() => {
    setAuctionAllBids(null);
    if (auction.status === STATUS_NAMES['not-started']) {
      setAuctionAllBids([]);
      setTotalPages(1);
    } else {
      getAuctionBids(auction.id, { page, searchQuery, sortBy }).then((res) => {
        setAuctionAllBids(res.data);
        setTotalPages(res.totalPages);
      });
    }
  }, [page, searchQuery, sortBy]);

  return (
    <>
      <CTable
        columns={auctionAllBidsHeaders}
        noDataMessage="There is no bid"
        className={styles.table}
        dataSource={filteredBids}
        loading={!auctionAllBids}
        rowFix={{
          rowHeight: 53,
          rowNumbers: 20,
          headerRowHeight: 40,
        }}
      />
    </>
  );
}

export default SingleAuctionAllBidsTable;
