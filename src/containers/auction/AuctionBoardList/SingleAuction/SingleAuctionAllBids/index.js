import classNames from 'classnames';
import Input from 'components/Input';
import {
  useState, useCallback, useRef,
} from 'react';
import CPagination from 'components/CPagination';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import TableDropDown from 'components/TableDropDown';
import AuctionContainer from 'containers/auction/AuctionContainer';
import styles from './styles.module.scss';
import SingleAuctionAllBidsTable from './SingleAuctionAllBidsTable';

const dropDownItems = [
  {
    text: 'Date',
    value: 'bidDate',
  },
  {
    text: 'Price',
    value: 'price',
  },
  {
    text: 'Amount',
    value: 'amount',
  },
];

function SingleAuctionAllBids({ pageName, assetCode, auction }) {
  const timeOutRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);
  const [sortBy, setSortBy] = useState(dropDownItems[0].value);

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
    { name: 'Bids' },
  ];

  return (
    <AuctionContainer title={`${auction.title} auction | All bids | Lumenswap`}>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className={styles['bread-crumb']}>
              <Breadcrumb
                spaceBetween={8}
                data={crumbData}
              />

              <div className="d-flex align-items-center">
                <span className="mr-3">Sort By</span>
                <TableDropDown defaultOption={dropDownItems[0]} onChange={(filter) => setSortBy(filter.value)} items={dropDownItems} placeholder="Sort by" />
              </div>
            </div>
            <div className={classNames(styles.card, styles['card-table'])}>
              <TableHeader />
              <SingleAuctionAllBidsTable
                page={page}
                assetCode={assetCode}
                searchQuery={searchQuery}
                setTotalPages={setTotalPages}
                auction={auction}
                sortBy={sortBy}
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

export default SingleAuctionAllBids;
