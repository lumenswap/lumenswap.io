import Head from 'next/head';
import classNames from 'classnames';
import Input from 'components/Input';
import { useState, useCallback } from 'react';
import CTabs from 'components/CTabs';
import CPagination from 'components/CPagination';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import AuctionHeader from '../AuctionHeader';
import styles from './styles.module.scss';
import BidTabContent from './BidTabContent';

function Bids({ pageName, assetCode }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };

  const handleTabChange = (newPage) => {
    setPage(newPage);
  };
  const SearchInput = useCallback(() => (
    <div className={styles.input}>
      <Input
        type="text"
        placeholder="Enter your address"
        height={40}
        fontSize={14}
        onChange={handleSearch}
      />
    </div>
  ), []);
  const tabs = [
    { title: 'Bids', id: 'bids' },
  ];
  const crumbData = [
    { url: urlMaker.auction.root(), name: 'Auction' },
    { url: urlMaker.auction.board.root(pageName), name: `${pageName}` },
    { name: 'Bids' },
  ];

  return (
    <div className="container-fluid">
      <Head>
        <title>Auction Bids | Lumenswap</title>
      </Head>
      <AuctionHeader />
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className={styles['bread-crumb']}>
              <Breadcrumb
                spaceBetween={8}
                data={crumbData}
              />
            </div>
            <div className={classNames(styles.card, styles['card-table'])}>
              <CTabs
                tabs={tabs}
                tabContent={BidTabContent}
                className={styles.tabs}
                onChange={handleTabChange}
                extraComponent={SearchInput}
                customTabProps={{
                  page, setTotalPages, assetCode, searchQuery,
                }}
              />
            </div>
            <div style={{ marginBottom: '60px' }} className="d-flex justify-content-end mt-4">
              <CPagination
                pages={totalPages}
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
  );
}

export default Bids;
