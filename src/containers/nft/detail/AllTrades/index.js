import NFTHeader from 'components/NFTHeader';
import Head from 'next/head';
import classNames from 'classnames';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import fetchNFTTrades from 'api/nftTradesAPI';
import { useState, useEffect } from 'react';
import numeral from 'numeral';
import CTable from 'components/CTable';
import minimizeAddress from 'helpers/minimizeAddress';
import InfinitePagination from 'components/InfinitePagination';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-container']}>
    <span>There is no asset trade</span>
  </div>
);

function AllTradesPage({ id }) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);
  const headerData = [
    {
      name: "All Lusi's",
      url: urlMaker.nft.root(),
    },
    {
      name: `Lusi #${id}`,
    },
    {
      name: 'Trades',
    },
  ];

  const tableHeaders = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 1,
      render: (data) => (
        <span className={styles.address}>
          <a href={generateAddressURL(data.buyer)} target="_blank" rel="noreferrer">{minimizeAddress(data.buyer)}</a>
        </span>
      ),
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: 2,
      render: (data) => (
        <span className={styles.address}>
          <a href={generateAddressURL(data.seller)} target="_blank" rel="noreferrer">{minimizeAddress(data.seller)}</a>
        </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => <span>{numeral(data.amount).format('0,0')} LSP</span>,
    },

  ];

  const [tradesData, setTradesData] = useState(null);

  const handlePageChange = (currentPage) => {
    setPage(currentPage);
  };

  useEffect(() => {
    const query = {
      page,
      limit: 20,
    };
    fetchNFTTrades(id, query).then((data) => setTradesData(data));
  }, [page]);
  return (
    <div className="container-fluid">
      <Head>
        <title>NFT | Lumenswap</title>
      </Head>
      <NFTHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <Breadcrumb data={headerData} className={styles.header} />
            <div className={styles['table-container']}>
              <div className={styles['table-header']}>
                <span>Trades</span>
              </div>
              <CTable
                columns={tableHeaders}
                noDataMessage={NoDataMessage}
                dataSource={tradesData}
                className={styles.table}
                loading={!tradesData}
              />
            </div>
            <InfinitePagination
              allPages={pages}
              currentPage={page}
              onPageChange={handlePageChange}
              className={styles.pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTradesPage;
