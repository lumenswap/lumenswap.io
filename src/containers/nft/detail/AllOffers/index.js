import NFTHeader from 'components/NFTHeader';
import Head from 'next/head';
import classNames from 'classnames';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import { useState, useEffect } from 'react';
import CTable from 'components/CTable';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import InfinitePagination from 'components/InfinitePagination';
import { fetchOfferAPI } from 'api/stellar';
import getAssetDetails from 'helpers/getAssetDetails';
import NLSP from 'tokens/NLSP';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-container']}>
    <span>There is no asset offer</span>
  </div>
);

const OFFER_FETCH_LIMIT = 20;

function fetchLusiOffers(cursor, id) {
  return fetchOfferAPI(
    getAssetDetails({ code: `Lusi${id}`, issuer: process.env.REACT_APP_LUSI_ISSUER }),
    getAssetDetails(NLSP),
    {
      limit: OFFER_FETCH_LIMIT,
      order: 'desc',
      cursor,
    },
  );
}

function AllOffersPage({ id }) {
  const [nextPageToken, setNextPageToken] = useState(null);
  const [currentPagingToken, setCurrentPagingToken] = useState(null);
  const [pagingTokens, setPagingTokens] = useState([]);
  const headerData = [
    {
      name: "All Lusi's",
      url: urlMaker.nft.root(),
    },
    {
      name: `Lusi #${id}`,
      url: urlMaker.nft.lusi(id),
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
          <a href={generateAddressURL(data.address)} target="_blank" rel="noreferrer">{minimizeAddress(data.seller)}</a>
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 2,
      render: (data) => <span>{moment(data.last_modified_time).fromNow()}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => <span>{humanAmount(data.amount)} NLSP</span>,
    },

  ];

  const [offersData, setOffersData] = useState(null);

  const handlePrevPage = () => {
    if (pagingTokens.length > 0) {
      const prevPageToken = pagingTokens[pagingTokens.length - 1];
      fetchLusiOffers(prevPageToken, id).then(async (res) => {
        setNextPageToken(currentPagingToken);
        setCurrentPagingToken(prevPageToken);
        setPagingTokens((prev) => prev.slice(0, -1));
        setOffersData(
          res.data._embedded.records,
        );
      }).catch(() => {
        setPagingTokens([]);
        setCurrentPagingToken(null);
        setNextPageToken(null);
        setOffersData([]);
      });
    }
  };

  const handleNextPage = () => {
    if (nextPageToken) {
      fetchLusiOffers(nextPageToken, id).then(async (res) => {
        if (res.data._embedded.records.length < 1) {
          setNextPageToken(null);
          return;
        }

        if (res.data._embedded.records.length >= OFFER_FETCH_LIMIT) {
          setNextPageToken(res
            .data._embedded
            .records[res.data._embedded.records.length - 1]
            .paging_token);
        } else {
          setNextPageToken(null);
        }
        setPagingTokens((prev) => [...prev, currentPagingToken]);

        setCurrentPagingToken(nextPageToken);
        setOffersData(
          res.data._embedded.records,
        );
      }).catch(() => {
        setPagingTokens([]);
        setCurrentPagingToken(null);
        setNextPageToken(null);
        setOffersData([]);
      });
    }
  };

  useEffect(() => {
    fetchLusiOffers(null, id).then(async (res) => {
      if (res.data._embedded.records.length >= OFFER_FETCH_LIMIT) {
        setNextPageToken(res
          .data._embedded
          .records[res.data._embedded.records.length - 1]
          .paging_token);
      }

      return res.data._embedded.records;
    }).then(async (res) => {
      setOffersData(res);
    }).catch(() => {
      setPagingTokens([]);
      setCurrentPagingToken(null);
      setNextPageToken(null);
      setOffersData([]);
    });
  }, []);

  return (
    <div className="container-fluid">
      <Head>
        <title>Lusi#{id} | All offers | Lumenswap</title>
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
                rowFix={{ rowHeight: 53, rowNumbers: 20, headerRowHeight: 46 }}
              />
            </div>
            <InfinitePagination
              hasNextPage={!!nextPageToken}
              hasPreviousPage={pagingTokens.length > 0}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              className={styles.pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOffersPage;
