import React from 'react';
import LoadingWithContainer from 'components/LoadingWithContainer/LoadingWithContainer';
import CTable from 'components/CTable';
import NoData from 'components/NoData';

import styles from './styles.module.scss';

const WinnersData = () => {
  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 1,
      render: (data) => <a href="/" className={styles.link}>{data.address}</a>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => data.amount,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (data) => data.price,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 5,
      render: (data) => data.total,
    },
  ];

  const row = {
    address: 'G8d6…r5fy', amount: '10,000 RBT', price: '1 XLM', total: '1250 XLM',
  };

  const data = Array(7).fill(row);

  return (
    <CTable
      columns={columns}
      noDataMessage={<NoData message="There is no bid" />}
      className={styles.table}
      dataSource={data}
      customLoading={LoadingWithContainer}
    />
  );
};

export default WinnersData;
