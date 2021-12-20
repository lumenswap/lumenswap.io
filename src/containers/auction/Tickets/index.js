import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import SelectOption from 'components/SelectOption';
import CTable from 'components/CTable';
import CPagination from 'components/CPagination';
import fetchAuctionTickets from 'api/auctionFakeTickets';

import moment from 'moment';
import useIsLogged from 'hooks/useIsLogged';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import AuctionHeader from '../AuctionHeader';
import styles from './styles.module.scss';

const AuctionTickets = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);
  const [tickets, setTickets] = useState(null);
  const isLogged = useIsLogged();
  const router = useRouter();

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
      render: (data) => <span>{data.amount} {data.baseAssetCode}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (data) => <span>{data.price} XLM</span>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 5,
      render: (data) => <span>{data.total} XLM</span>,
    },
    {
      title: 'Date',
      dataIndex: 'data',
      key: 2,
      render: (data) => <span>{moment(data.date).fromNow()}</span>,
    },
    {
      title: 'Auction',
      dataIndex: 'auction',
      key: 2,
      render: (data) => {
        if (data.settled) {
          return (
            <div className={styles['status-settled']}>
              Settled
            </div>
          );
        }
        return <div className={styles['status-cancel']}>Cancel</div>;
      }
      ,
    },
  ];
  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.auction.root());
    }
  }, []);

  useEffect(() => {
    setTickets(null);
    const query = { number: 10, currentPage: page, asset: selectedItem.value };
    fetchAuctionTickets(query).then((data) => {
      setTickets(data.ticketsData);
      setPages(data.totalPages);
    });
  }, [page, selectedItem]);

  return (
    <Container>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.title}>My Bids</h1>
              <SelectOption
                items={dropdownItems}
                defaultValue={selectedItem}
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
                    noDataMessage="There is no bid"
                    className={styles.table}
                    dataSource={tickets}
                    loading={!tickets}
                  />
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <CPagination
                    pages={pages}
                    currentPage={page}
                    onPageClick={(newPage) => {
                      setPage(newPage);
                    }}
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
