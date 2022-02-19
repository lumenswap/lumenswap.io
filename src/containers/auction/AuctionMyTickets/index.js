import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import TableDropDown from 'components/TableDropDown';
import CTable from 'components/CTable';
import moment from 'moment';
import urlMaker from 'helpers/urlMaker';
import AuctionContainer from 'containers/auction/AuctionContainer';
import { getAuctionWinners } from 'api/auction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfferAPI } from 'api/stellar';
import { getAssetDetails } from 'helpers/asset';
import BN from 'helpers/BN';
import XLM from 'tokens/XLM';
import humanizeAmount from 'helpers/humanizeAmount';
import generateManageBuyTRX from 'stellar-trx/generateManageBuyTRX';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import useRequiredLogin from 'hooks/useRequiredLogin';
import styles from './styles.module.scss';

const AuctionMyTickets = ({ auctions }) => {
  const userAddress = useSelector((state) => state.user.detail.address);
  const dispatch = useDispatch();

  const [dropdownItems, setDropDownItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tickets, setTickets] = useState(null);
  useRequiredLogin(urlMaker.auction.root());

  function fetchAuctionMyBids() {
    setTickets(null);
    let myTickets = [];
    if (selectedItem && userAddress) {
      getAuctionWinners(selectedItem?.value, { address: userAddress }).then((res) => {
        myTickets = res.data.map((ticket) => ({
          ...ticket,
          settled: true,
        }));
      });

      fetchOfferAPI(
        getAssetDetails(
          { code: selectedItem.assetCode, issuer: selectedItem.assetIssuer },
        ), getAssetDetails(XLM),
        { order: 'desc', limit: 200, seller: userAddress },
      )
        .then((data) => {
          const offers = data.data._embedded.records;
          const theBids = offers
            .filter((offer) => new BN(1)
              .div(offer.price)
              .isGreaterThanOrEqualTo(selectedItem.basePrice));

          const myBids = theBids.map((offer) => ({
            id: offer.id,
            price: new BN(1).div(offer.price).toFixed(7),
            amount: new BN(offer.amount).times(offer.price).toFixed(7),
            total: new BN(offer.amount).toString(),
            bidDate: offer.last_modified_time,
          }));

          myTickets = [...myTickets, ...myBids];
          myTickets.sort((a, b) => new Date(b.bidDate) - new Date(a.bidDate));
          setTickets(myTickets);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCancelOffer(data) {
    function func() {
      return generateManageBuyTRX(
        userAddress,
        getAssetDetails({ code: selectedItem.assetCode, issuer: selectedItem.assetIssuer }),
        getAssetDetails(XLM),
        0,
        data.price,
        data.id,
      );
    }

    showGenerateTrx(func, dispatch)
      .then((trx) => showSignResponse(trx, dispatch))
      .catch(console.log)
      .then(fetchAuctionMyBids);
  }

  useEffect(() => {
    const mappedAuctions = auctions.map((auction) => ({
      value: auction.id,
      assetCode: auction.assetCode,
      assetIssuer: auction.assetIssuer,
      basePrice: auction.basePrice,
      text: `${auction.title}(${auction.assetCode})`,
    }));

    setDropDownItems(mappedAuctions);
    setSelectedItem(mappedAuctions[0]);
  }, []);

  const MyTicketsTableHeaders = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => <span>{humanizeAmount(data.amount)} {selectedItem.assetCode}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 4,
      render: (data) => <span>{humanizeAmount(data.price)} XLM</span>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 5,
      render: (data) => <span>{humanizeAmount(data.total)} XLM</span>,
    },
    {
      title: 'Date',
      dataIndex: 'data',
      key: 2,
      render: (data) => (
        <span>
          {moment(data.bidDate).fromNow()}
        </span>
      ),
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
        return <div onClick={() => handleCancelOffer(data)} className={styles['status-cancel']}>Cancel</div>;
      }
      ,
    },
  ];

  useEffect(() => {
    fetchAuctionMyBids();
  }, [selectedItem]);

  return (
    <AuctionContainer title="My activity | Lumenswap">
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.title}>My Bids</h1>
              <TableDropDown defaultOption={dropdownItems[0]} onChange={() => {}} items={dropdownItems} placeholder="Select Auction" />
            </div>
            <div className="row">
              <div className="col-12">
                <div className={styles.card}>
                  <CTable
                    columns={MyTicketsTableHeaders}
                    noDataMessage="There is no bid"
                    className={styles.table}
                    dataSource={tickets}
                    loading={!tickets}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuctionContainer>
  );
};

export default AuctionMyTickets;
