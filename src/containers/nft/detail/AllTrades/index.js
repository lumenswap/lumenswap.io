import NFTHeader from 'components/NFTHeader';
import Head from 'next/head';
import classNames from 'classnames';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import { useState, useEffect } from 'react';
import CTable from 'components/CTable';
import minimizeAddress from 'helpers/minimizeAddress';
import InfinitePagination from 'components/InfinitePagination';
import { fetchTradeAPI } from 'api/stellar';
import getAssetDetails from 'helpers/getAssetDetails';
import humanAmount from 'helpers/humanAmount';
import NLSP from 'tokens/NLSP';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-container']}>
    <span>There is no asset trade</span>
  </div>
);

const OFFER_FETCH_LIMIT = 20;

function fetchLusiTrades(cursor, id) {
  return fetchTradeAPI(
    getAssetDetails({ code: `Lusi${id}`, issuer: process.env.REACT_APP_LUSI_ISSUER }),
    getAssetDetails(NLSP),
    {
      limit: OFFER_FETCH_LIMIT,
      order: 'desc',
      cursor,
    },
  );
}

function AllTradesPage({ id }) {
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
          <a href={generateAddressURL(data.counter_account)} target="_blank" rel="noreferrer">{minimizeAddress(data.base_account)}</a>
        </span>
      ),
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: 2,
      render: (data) => (
        <span className={styles.address}>
          <a href={generateAddressURL(data.base_account)} target="_blank" rel="noreferrer">{minimizeAddress(data.counter_account)}</a>
        </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => <span>{humanAmount(data.counter_amount)} NLSP</span>,
    },
  ];

  const [tradesData, setTradesData] = useState(null);

  const handlePrevPage = () => {
    if (pagingTokens.length > 0) {
      const prevPageToken = pagingTokens[pagingTokens.length - 1];
      fetchLusiTrades(prevPageToken, id).then(async (res) => {
        setNextPageToken(currentPagingToken);
        setCurrentPagingToken(prevPageToken);
        setPagingTokens((prev) => prev.slice(0, -1));
        setTradesData(res.data._embedded.records);
      }).catch(() => {
        setPagingTokens([]);
        setCurrentPagingToken(null);
        setNextPageToken(null);
        setTradesData([]);
      });
    }
  };

  const handleNextPage = () => {
    if (nextPageToken) {
      fetchLusiTrades(nextPageToken, id).then(async (res) => {
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
        setTradesData(res.data._embedded.records);
      }).catch(() => {
        setPagingTokens([]);
        setCurrentPagingToken(null);
        setNextPageToken(null);
        setTradesData([]);
      });
    }
  };

  useEffect(() => {
    fetchLusiTrades(null, id).then(async (res) => {
      if (res.data._embedded.records.length >= OFFER_FETCH_LIMIT) {
        setNextPageToken(res
          .data._embedded
          .records[res.data._embedded.records.length - 1]
          .paging_token);
      }
      setTradesData(res.data._embedded.records);
    }).catch(() => {
      setPagingTokens([]);
      setCurrentPagingToken(null);
      setNextPageToken(null);
      setTradesData([]);
    });
  }, []);
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

export default AllTradesPage;
