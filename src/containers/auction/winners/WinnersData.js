import CTable from 'components/CTable';
import NoData from 'components/NoData';
import numeral from 'numeral';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import { useEffect, useState } from 'react';
import { getAuctionWinners } from 'api/auction';
import styles from './styles.module.scss';

function WinnersData({
  page, setTotalPages, searchQuery, assetCode, auction,
}) {
  const [winners, setWinners] = useState(null);

  const filteredWinners = winners && [...winners];

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
          {numeral(data.amount).format('0,0')} {assetCode}
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
          {numeral(data.total).format('0,0')} XLM
        </span>
      ),
    },
  ];

  useEffect(() => {
    setWinners(null);
    getAuctionWinners(auction.id, { page, searchQuery }).then((data) => {
      setWinners(data.data);
      setTotalPages(data.totalPages);
    });
  }, [page, searchQuery]);

  return (
    <>
      <CTable
        columns={columns}
        noDataComponent={() => <NoData message="There is no winner" />}
        className={styles.table}
        dataSource={filteredWinners}
        loading={!winners}
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
