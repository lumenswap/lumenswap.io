import React, { useEffect, useState } from 'react';
import CTable from 'components/CTable';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import { fetchOfferAPI } from 'api/stellar';
import { getAssetDetails } from 'helpers/asset';
import XLM from 'tokens/XLM';
import BN from 'helpers/BN';
import humanizeAmount from 'helpers/humanizeAmount';
import { getAuctionBids } from 'api/auction';
import { STATUS_NAMES } from 'containers/auction/consts';
import styles from './styles.module.scss';

const SingleAuctionBids = ({
  searchQuery, tab, assetCode, assetIssuer, basePrice, refreshData, auctionStatus, auctionId,
}) => {
  const [auctionBids, setAuctionBids] = useState(null);

  let filteredBids = auctionBids && [...auctionBids];
  if (searchQuery) {
    if (tab === 'bid') {
      filteredBids = filteredBids?.filter((bid) => bid.seller.search(searchQuery) !== -1);
    }
  }
  const auctionBidsHeaders = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 1,
      render: (bid) => (
        <a
          target="_blank"
          rel="noreferrer"
          href={generateAddressURL(bid.seller)}
          className={styles.link}
        >
          {minimizeAddress(bid.seller)}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'data',
      key: 2,
      render: (bid) => (
        <span>
          {moment(bid.last_modified_time).fromNow()}
        </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (bid) => (
        <span>
          {humanizeAmount(new BN(bid.amount)
            .times(bid.price).toString())} {assetCode}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (bid) => (
        <span>
          {humanizeAmount(new BN(1).div(bid.price).toFixed(7))} XLM
        </span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 5,
      render: (bid) => (
        <span>
          {humanizeAmount(new BN(bid.amount))} XLM
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (auctionStatus === STATUS_NAMES['not-started']) {
      setAuctionBids([]);
    } else if (auctionStatus === STATUS_NAMES.ended) {
      getAuctionBids(auctionId, {}).then((bids) => {
        const mappedBids = bids.data.map((bid) => ({
          price: new BN(1).div(new BN(bid.price)).toFixed(7),
          amount: new BN(bid.total).div(10 ** 7).toFixed(7),
          seller: bid.address,
          last_modified_time: bid.bidDate,
        }));

        setAuctionBids(mappedBids);
      });
    } else {
      fetchOfferAPI(
        getAssetDetails(
          { code: assetCode, issuer: assetIssuer },
        ), getAssetDetails(XLM),
        { order: 'desc', limit: 200 },
      )
        .then((res) => {
          const offers = res.data._embedded.records;
          const theBids = offers.filter((offer) => new BN(1)
            .div(offer.price)
            .isGreaterThanOrEqualTo(basePrice));

          setAuctionBids(theBids.slice(0, 10));
        })
        .catch((err) => console.log(err));
    }
  }, [refreshData]);
  filteredBids = filteredBids?.map((item, i) => (
    { ...item, key: item.address + i }
  ));

  return (
    <CTable
      columns={auctionBidsHeaders}
      noDataMessage="There is no bid"
      className={styles.table}
      dataSource={filteredBids}
      loading={!auctionBids}
      rowFix={{
        rowHeight: 53,
        rowNumbers: 10,
        headerRowHeight: 40,
      }}
    />
  );
};

export default SingleAuctionBids;
