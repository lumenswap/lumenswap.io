import classNames from 'classnames';
import Input from 'components/Input';
import { useState, useCallback, useRef } from 'react';
import CPagination from 'components/CPagination';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import AuctionContainer from 'containers/auction/AuctionContainer';
import styles from './styles.module.scss';
import WinnersData from './WinnersData';

function SingleAuctionAllWinners({ pageName, assetCode, auction }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);
  const timeOutRef = useRef(null);

  const handleSearch = (e) => {
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(async () => {
      setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
    }, 700);
  };

  const TableHeader = useCallback(() => (
    <div className={styles.input}>
      <span>
        Winners
      </span>
      <Input
        type="text"
        placeholder="Enter your address"
        height={40}
        fontSize={14}
        onChange={handleSearch}
      />
    </div>
  ), []);

  const crumbData = [
    { url: urlMaker.auction.root(), name: 'Auction' },
    { url: urlMaker.auction.singleAuction.root(pageName), name: `${pageName.charAt(0).toUpperCase() + pageName.slice(1)}(${assetCode})` },
    { name: 'Winners' },
  ];

  return (
    <AuctionContainer title={`${auction.title} auction | All winners | Lumenswap`}>
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
              <WinnersData
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
    </AuctionContainer>
  );
}

export default SingleAuctionAllWinners;
