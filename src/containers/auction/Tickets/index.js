import Head from 'next/head';
import React, { useState } from 'react';
import classNames from 'classnames';

import AuctionHeader from 'components/AuctionHeader';
import SelectOption from 'components/SelectOption';
import CTable from 'components/CTable';
import NoData from 'components/NoData';
import LoadingWithContainer from 'components/LoadingWithContainer/LoadingWithContainer';

import styles from './styles.module.scss';

const AuctionTickets = () => {
  const dropdownItems = [
    { value: 'rbt', label: 'Rabet (RBT)' },
    { value: 'lsp', label: 'Lumenswap (LSP)' },
  ];
  const [selectedItem, setSelectedItem] = useState(dropdownItems[0]);

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Auction Tickets | Lumenswap</title>
      </Head>
      <AuctionHeader />
      {children}
    </div>
  );

  const columns = [
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
    {
      title: 'Date',
      dataIndex: 'data',
      key: 2,
      render: (data) => data.date,
    },
    {
      title: 'Auction',
      dataIndex: 'auction',
      key: 2,
      render: (data) => (
        <div className={data.auction === 'Cancel'
          ? styles['status-cancel'] : styles['status-settled']}
        >
          {data.auction}
        </div>
      ),
    },
  ];

  const rows = [
    {
      date: '1 min ago', amount: '100 RBT', price: '0.1 XLM', total: '100 XLM', auction: 'Cancel',
    },
    {
      date: '1 min ago', amount: '100 RBT', price: '0.1 XLM', total: '100 XLM', auction: 'Settled',
    },
  ];

  const data = Array(4).fill(rows[0]).concat(...Array(5).fill(rows[1]));

  return (
    <Container>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.title}>My Bids</h1>
              <SelectOption
                items={dropdownItems}
                setValue={setSelectedItem}
                className={styles.filter}
                isSearchable={false}
              />
            </div>
            <div className="row">
              <div className="col-12">
                <div className={styles.card}>
                  <CTable
                    columns={columns}
                    noDataMessage={<NoData message="There is no bid" />}
                    className={styles.table}
                    dataSource={data}
                    customLoading={LoadingWithContainer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuctionTickets;
