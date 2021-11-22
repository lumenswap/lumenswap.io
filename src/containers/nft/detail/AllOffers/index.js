import NFTHeader from 'components/NFTHeader';
import Head from 'next/head';
import classNames from 'classnames';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import fetchNFTOffers from 'api/nftOffersAPI';
import { useState, useEffect } from 'react';
import numeral from 'numeral';
import CTable from 'components/CTable';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import InfinitePagination from 'components/InfinitePagination';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-container']}>
    <span>There is no asset offer</span>
  </div>
);

function AllOffersPage({ id }) {
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
      name: 'Offers',
    },
  ];

  const tableHeaders = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 1,
      render: (data) => (
        <span className={styles.address}>
          <a href={generateAddressURL(data.address)} target="_blank" rel="noreferrer">{minimizeAddress(data.address)}</a>
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 2,
      render: (data) => <span>{moment(data.time).fromNow()}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => <span>{numeral(data.amount).format('0,0')} LSP</span>,
    },

  ];

  const [offersData, setOffersData] = useState(null);

  const handlePageChange = (currentPage) => {
    setPage(currentPage);
  };

  useEffect(() => {
    const query = {
      page,
      limit: 20,
    };
    fetchNFTOffers(id, query).then((data) => setOffersData(data));
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
                <span>Offers</span>
              </div>
              <CTable
                columns={tableHeaders}
                noDataMessage={NoDataMessage}
                dataSource={offersData}
                className={styles.table}
                loading={!offersData}
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

export default AllOffersPage;
