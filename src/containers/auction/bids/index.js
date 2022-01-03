import Head from 'next/head';
import classNames from 'classnames';
import Input from 'components/Input';
import { useState, useCallback, useRef } from 'react';
import CPagination from 'components/CPagination';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import ServerSideLoading from 'components/ServerSideLoading';
import AuctionHeader from '../AuctionHeader';
import styles from './styles.module.scss';
import BidsData from './BidsData';
import { STATUS_NAMES } from '../consts/board';

function Bids({ pageName, assetCode, auction }) {
  const timeOutRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSearch = (e) => {
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(async () => {
      setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
    }, 700);
  };

  const TableHeader = useCallback(() => (
    <div className={styles.input}>
      <span>
        Bids
      </span>
      <Input
        type="text"
        disabled={auction.status !== STATUS_NAMES.live}
        placeholder="Enter your address"
        height={40}
        fontSize={14}
        onChange={handleSearch}
      />
    </div>
  ), []);

  const crumbData = [
    { url: urlMaker.auction.root(), name: 'Auction' },
    { url: urlMaker.auction.singleAuction.root(pageName), name: `${pageName}` },
    { name: 'Bids' },
  ];

  return (
    <div className="container-fluid">
      <Head>
        <title>Auction Bids | Lumenswap</title>
      </Head>
      <AuctionHeader />
      <ServerSideLoading>
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
                <TableHeader />
                <BidsData
                  page={page}
                  assetCode={assetCode}
                  searchQuery={searchQuery}
                  setTotalPages={setTotalPages}
                  auction={auction}
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
      </ServerSideLoading>
    </div>
  );
}

export default Bids;
