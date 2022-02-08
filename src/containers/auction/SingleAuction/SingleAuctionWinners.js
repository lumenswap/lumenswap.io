import React, { useEffect, useState } from 'react';
import CTable from 'components/CTable';
import BN from 'helpers/BN';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import numeral from 'numeral';
import { getAuctionWinners } from 'api/auction';
import styles from './styles.module.scss';

const SingleAuctionWinners = ({
  searchQuery, tab, assetCode, auctionId,
}) => {
  const [auctionWinners, setAuctionWinners] = useState(null);

  let filteredWinners = auctionWinners && [...auctionWinners];
  if (searchQuery) {
    if (tab === 'winner') {
      filteredWinners = filteredWinners?.filter((bid) => bid.address.search(searchQuery) !== -1);
    }
  }

  const auctionWinnersHeaders = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 1,
      render: (winner) => (
        <a
          target="_blank"
          rel="noreferrer"
          href={generateAddressURL(winner.address)}
          className={styles.link}
        >
          {minimizeAddress(winner.address)}
        </a>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (winner) => (
        <span>
          {numeral(new BN(winner.amount).div(10 ** 7).toFixed(7)).format('0,0')} {assetCode}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (winner) => (
        <span>
          {winner.price} XLM
        </span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 5,
      render: (winner) => (
        <span>
          {numeral(new BN(winner.total).div(10 ** 7).toFixed(7)).format('0,0')} XLM
        </span>
      ),
    },
  ];

  useEffect(() => {
    getAuctionWinners(auctionId).then((res) => setAuctionWinners(res.data));
  }, []);

  filteredWinners = filteredWinners?.map((item, i) => (
    {
      ...item,
      key: item.address + i,
    }
  ));
  return (
    <CTable
      columns={auctionWinnersHeaders}
      noDataMessage="There is no winner"
      className={styles.table}
      dataSource={filteredWinners?.slice(0, 10)}
      loading={!auctionWinners}
      rowFix={{
        rowHeight: 53,
        rowNumbers: 10,
        headerRowHeight: 40,
      }}
    />
  );
};

export default SingleAuctionWinners;
