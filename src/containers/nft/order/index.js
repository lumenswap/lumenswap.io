import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import NFTHeader from 'components/NFTHeader';
import moment from 'moment';
import CTable from 'components/CTable';
import urlMaker from 'helpers/urlMaker';
import { useState, useEffect } from 'react';
import { fetchOffersOfAccount } from 'api/stellar';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useIsLogged from 'hooks/useIsLogged';
import isSameAsset from 'helpers/isSameAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import generateManageBuyTRX from 'stellar-trx/generateManageBuyTRX';
import XLM from 'tokens/XLM';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import BN from 'helpers/BN';
import NLSP from 'tokens/NLSP';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['loading-data-container']}>
    <span>You have no offers</span>
  </div>
);

function loadOfferData(userAddress, setOrders) {
  const allOffers = [];
  fetchOffersOfAccount(userAddress, { limit: 200 }).then((data) => {
    allOffers.push(...data.data._embedded.records);
    if (data.data._embedded.records.length > 0) {
      return fetchOffersOfAccount(userAddress, {
        limit: 200,
        cursor: data.data._embedded.records[data.data._embedded.records.length - 1].paging_token,
      });
    }

    return data;
  }).then((data) => {
    allOffers.push(...data.data._embedded.records);
    setOrders(allOffers
      .filter((offer) => {
        const isSellAssetLusi = offer.selling.asset_issuer === process.env.REACT_APP_LUSI_ISSUER;
        const isBuyAssetLusi = offer.buying.asset_issuer === process.env.REACT_APP_LUSI_ISSUER;
        const isSellAssetLSP = isSameAsset(getAssetDetails(NLSP), getAssetDetails({
          code: offer.selling.asset_code,
          issuer: offer.selling.asset_issuer,
        }));
        const isBuyAssetLSP = isSameAsset(getAssetDetails(NLSP), getAssetDetails({
          code: offer.buying.asset_code,
          issuer: offer.buying.asset_issuer,
        }));

        return (isSellAssetLusi || isBuyAssetLusi) && (isSellAssetLSP || isBuyAssetLSP);
      }).map((offer) => {
        const isSellAssetLusi = offer.selling.asset_issuer === process.env.REACT_APP_LUSI_ISSUER;
        const isBuyAssetLSP = isSameAsset(getAssetDetails(NLSP), getAssetDetails({
          code: offer.buying.asset_code,
          issuer: offer.buying.asset_issuer,
        }));

        const isSeller = offer.seller === userAddress;
        // const isBuyer = offer.buyer === userAddress;

        let type;
        if (isSellAssetLusi && isBuyAssetLSP) {
          if (isSeller) {
            type = 'Sell';
          } else {
            type = 'Buy';
          }
        } else if (isSeller) {
          type = 'Buy';
        } else {
          type = 'Sell';
        }

        let lusiNumber;
        let amount;
        if (isBuyAssetLSP) {
          lusiNumber = offer.selling.asset_code.replace('Lusi', '');
          amount = new BN(offer.price).div(10 ** 7).toFixed(7);
        } else {
          lusiNumber = offer.buying.asset_code.replace('Lusi', '');
          amount = offer.amount;
        }

        return {
          id: offer.id,
          time: offer.last_modified_time,
          type,
          amount,
          lusiNumber,
        };
      }));
  });
}

const NFTOrder = () => {
  const [orders, setOrders] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const isLogged = useIsLogged();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.nft.root());
    }
  }, [isLogged]);

  useEffect(() => {
    loadOfferData(userAddress, setOrders);
  }, []);

  const handleCancelOrder = async (offerId) => {
    function func() {
      return generateManageBuyTRX(
        userAddress,
        getAssetDetails(XLM),
        getAssetDetails(NLSP),
        '0',
        '0.1',
        offerId,
      );
    }

    await showGenerateTrx(func, dispatch)
      .then((trx) => showSignResponse(trx, dispatch))
      .catch(console.error);

    setOrders(null);
    loadOfferData(userAddress, setOrders);
  };

  const tableHeaders = [
    {
      title: 'Info',
      dataIndex: 'info',
      key: 1,
      render: (data) => (
        <div className={styles['type-clmn']}>
          <span>{data.type} </span>
          <Link href={urlMaker.nft.lusi(data.lusiNumber)}><a>Lusi#{data.lusiNumber}</a></Link>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 2,
      render: (data) => (
        <div>
          {moment(data.time).fromNow()}
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 3,
      render: (data) => (
        <div>
          {humanAmount(data.amount)} NLSP
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 4,
      render: (data) => (
        <div
          className={styles['cancel-btn']}
          onClick={() => handleCancelOrder(data.id)}
        >Cancel
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <Head>
        <title>NFT | My offers</title>
      </Head>
      <NFTHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>My Offers</h1>
            <div className={styles['table-container']}>
              <CTable
                className={styles.table}
                columns={tableHeaders}
                dataSource={orders}
                noDataMessage={NoDataMessage}
                loading={!orders}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTOrder;
