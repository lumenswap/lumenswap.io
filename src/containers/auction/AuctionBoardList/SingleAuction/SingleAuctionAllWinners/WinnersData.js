import CTable from 'components/CTable';
import numeral from 'numeral';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import { useEffect, useState } from 'react';
import { getAuctionWinners } from 'api/auction';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

function WinnersData({
  page, setTotalPages, searchQuery, assetCode, auction,
}) {
  const [auctionAllWinners, setAuctionAllWinners] = useState(null);

  const filteredWinners = auctionAllWinners && [...auctionAllWinners];

  const auctionAllWinnersHeaders = [
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
    setAuctionAllWinners(null);
    getAuctionWinners(auction.id, { page, searchQuery }).then((res) => {
      setAuctionAllWinners(res.data);
      setTotalPages(res.totalPages);
    });
  }, [page, searchQuery]);

  return (
    <>
      <CTable
        columns={auctionAllWinnersHeaders}
        noDataMessage="There is no winner"
        className={styles.table}
        dataSource={filteredWinners}
        loading={!auctionAllWinners}
        rowFix={{
          rowHeight: 53,
          rowNumbers: 20,
          headerRowHeight: 40,
        }}
      />
    </>
  );
}

export default WinnersData;
