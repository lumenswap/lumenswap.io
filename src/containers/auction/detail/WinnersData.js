import React, { useEffect, useState } from 'react';
import CTable from 'components/CTable';
import BN from 'helpers/BN';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import numeral from 'numeral';
import { getAuctionWinners } from 'api/auction';
import styles from './styles.module.scss';

const WinnersData = ({
  searchQuery, tab, assetCode, auctionId,
}) => {
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
        <a
          target="_blank"
          rel="noreferrer"
          href={generateAddressURL(data.address)}
          className={styles.link}
        >
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
          {numeral(new BN(data.amount).div(10 ** 7).toFixed(7)).format('0,0')} {assetCode}
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
          {numeral(new BN(data.total).div(10 ** 7).toFixed(7)).format('0,0')} XLM
        </span>
      ),
    },
  ];

  useEffect(() => {
    getAuctionWinners(auctionId).then((data) => setWinners(data.data));
  }, []);

  filteredWinners = filteredWinners?.map((item, i) => (
    {
      ...item,
      key: item.address + i,
    }
  ));
  return (
    <CTable
      columns={columns}
      noDataMessage="There is no winner"
      className={styles.table}
      dataSource={filteredWinners?.slice(0, 10)}
      loading={!winners}
      rowFix={{
        rowHeight: 53,
        rowNumbers: 10,
        headerRowHeight: 40,
      }}
    />
  );
};

export default WinnersData;
