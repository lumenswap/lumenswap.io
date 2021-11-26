import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import NFTHeader from 'components/NFTHeader';
import BN from 'helpers/BN';
import Button from 'components/Button';
import CTabs from 'components/CTabs';
import { openModalAction, openConnectModal } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import PlaceNFTOrder from 'containers/nft/PlaceNFTOrder';
import useIsLogged from 'hooks/useIsLogged';
import minimizeAddress from 'helpers/minimizeAddress';
import CSeeAllContentsButton from 'components/CSeeAllContentsButton';
import InfoBox from 'components/InfoBox';
import {
  generateAddressURL,
  twitterUrlMaker,
  telegramUrlMaker,
  assetGenerator,
  ipfsHashGenerator,
} from 'helpers/explorerURLGenerator';
import numeral from 'numeral';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import Submitting from 'components/Submitting';
import isSameAsset from 'helpers/isSameAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import { fetchAccountFullDetails, fetchOffersOfAccount } from 'api/stellar';
import { getAssetHolderApi } from 'api/nft';
import styles from './styles.module.scss';
import NFTDetailsTabContent from './NFTDetailsTabContent';
import SetOrUpdateNFTPrice from './SetOrUpdateNFTPrice';

function PlaceOrSetPriceButtonContent({ buttonState }) {
  if (buttonState === 'loading') {
    return <Submitting loadingSize={21} />;
  }

  if (buttonState === 'place') {
    return 'Place an offer';
  }

  if (buttonState === 'set') {
    return 'Set a price';
  }

  if (buttonState === 'update') {
    return 'Update price';
  }

  return null;
}

const NFTDetail = ({ id: lusiId, data }) => {
  const dispatch = useDispatch();
  const isLogged = useIsLogged();
  const [ownerInfoData, setOnwerInfoData] = useState(null);
  const [tab, setTab] = useState('offer');
  const userBalances = useSelector((state) => state.userBalance);
  const userAddress = useSelector((state) => state.user.detail.address);
  const [buttonState, setButtonState] = useState(null);
  const [offerIdToUpdate, setOfferIdToUpdate] = useState(null);

  useEffect(() => {
    async function loadOfferData() {
      if (isLogged) {
        setButtonState('loading');

        const currentLusi = getAssetDetails({ code: `Lusi${lusiId}`, issuer: process.env.REACT_APP_LUSI_ISSUER });
        let found = false;
        for (const balance of userBalances) {
          if (isSameAsset(getAssetDetails(balance.asset), currentLusi)
          && new BN(balance.rawBalance).gt(0)) {
            found = true;
            break;
          }
        }

        let offerFound = null;
        if (found) {
          const userOffers = await fetchOffersOfAccount(userAddress, { limit: 200, order: 'desc' }).then((res) => res.data._embedded.records);
          for (const offer of userOffers) {
            const offerSellingAsset = getAssetDetails({
              code: offer.selling.asset_code,
              issuer: offer.selling.asset_issuer,
            });
            if (isSameAsset(offerSellingAsset, currentLusi)) {
              console.log('peyda kard');
              offerFound = offer.id;
              break;
            }
          }
        }

        if (offerFound !== null) {
          setOfferIdToUpdate(offerFound);
          setButtonState('update');
        } else if (found) {
          setButtonState('set');
        } else {
          setButtonState('place');
        }
      } else {
        setButtonState(null);
      }
    }

    loadOfferData();
  }, [isLogged, userAddress, JSON.stringify(userBalances)]);

  useEffect(() => {
    getAssetHolderApi(`${data.assetCode}-${process.env.REACT_APP_LUSI_ISSUER}`).then((res) => {
      fetchAccountFullDetails(res._embedded.records[0].account).then((accDet) => {
        setOnwerInfoData({
          address: res._embedded.records[0].account,
          telegram: accDet.data.telegram,
          twitter: accDet.data.twitter,
        });
      });
    });
  }, []);

  const nftInfo = [
    {
      title: 'Price',
      tooltip: 'tooltip',
      render: (info) => {
        if (!new BN(info.price).isZero()) {
          return <span className={styles.infos}>{numeral(info.price).format('0,0')} LSP</span>;
        }

        return <span className={styles.infos}>Not set yet</span>;
      },
    },
    {
      title: 'Asset',
      tooltip: 'tooltip',
      externalLink: {
        title: `${data.nftInfo.asset}`,
        url: assetGenerator(data.assetCode, process.env.REACT_APP_LUSI_ISSUER),
      },
    },
    {
      title: 'IPFs hash',
      tooltip: 'tooltip',
      externalLink: {
        title: `${minimizeAddress(data.nftInfo.ipfHash)}`,
        url: ipfsHashGenerator(data.nftInfo.ipfHash),
      },
    },
  ];

  const ownerInfo = [
    {
      title: 'Address',
      tooltip: 'tooltip',
      externalLink: {
        title: ownerInfoData?.address ? `${minimizeAddress(ownerInfoData?.address)}` : '-',
        url: ownerInfoData?.address ? generateAddressURL(ownerInfoData?.address) : '-',
      },
    },
    {
      title: 'Twitter',
      tooltip: 'tooltip',
      externalLink: {
        title: ownerInfoData?.twitter ? `@${ownerInfoData?.twitter}` : '-',
        url: ownerInfoData?.twitter ? twitterUrlMaker(ownerInfoData?.twitter) : '-',
      },
    },
    {
      title: 'Telegram',
      tooltip: 'tooltip',
      externalLink: {
        title: ownerInfoData?.telegram ? `@${ownerInfoData?.telegram}` : '-',
        url: ownerInfoData?.telegram ? telegramUrlMaker(ownerInfoData?.telegram) : '-',
      },
    },
  ];

  const tabs = [
    { title: 'Offers', id: 'offer' },
    { title: 'Trades', id: 'trade' },
  ];

  const breadCrumbData = [
    {
      name: 'My lusi',
      url: urlMaker.nft.root(),
    },
    {
      name: `Lusi #${lusiId}`,
    },
  ];

  const handlePlaceOffer = () => {
    if (isLogged) {
      if (buttonState === 'place') {
        dispatch(
          openModalAction({
            modalProps: { title: 'Place an offer' },
            content: <PlaceNFTOrder lusiAssetCode={data.assetCode} />,
          }),
        );
      } else if (buttonState === 'set') {
        dispatch(
          openModalAction({
            modalProps: { title: 'Set a price' },
            content: <SetOrUpdateNFTPrice
              lusiAssetCode={data.assetCode}
              mode={buttonState}
              offerId={offerIdToUpdate}
            />,
          }),
        );
      } else if (buttonState === 'update') {
        dispatch(
          openModalAction({
            modalProps: { title: 'Update price' },
            content: <SetOrUpdateNFTPrice
              lusiAssetCode={data.assetCode}
              mode={buttonState}
              offerId={offerIdToUpdate}
            />,
          }),
        );
      }
    } else {
      dispatch(openConnectModal());
    }
  };

  const handleChangeTab = (tabId) => {
    setTab(tabId);
  };

  function generateLink() {
    if (tab === 'offer') {
      return urlMaker.nft.lusiOffers(lusiId);
    }

    return urlMaker.nft.lusiTrades(lusiId);
  }

  return (
    <div className="container-fluid">
      <Head>
        <title>NFT | Lumenswap</title>
      </Head>
      <NFTHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">

            <div className="d-flex justify-content-between align-items-center">
              <Breadcrumb data={breadCrumbData} />
              {buttonState !== null && (
                <Button
                  variant="primary"
                  fontWeight={500}
                  className={styles.btn}
                  onClick={handlePlaceOffer}
                  disabled={buttonState === 'loading'}
                >
                  <PlaceOrSetPriceButtonContent buttonState={buttonState} />
                </Button>
              )}
            </div>

            <div className={classNames('row', styles.row)}>
              <div className={classNames('col-lg-6 col-md-6 col-sm-12 col-12', styles.col)}>
                <div className={classNames(styles.card, styles['card-nft'])}>
                  <div className={classNames('d-flex justify-content-center', styles['img-container'])}>
                    <Image src={data.imageUrl} layout="fill" objectFit="contain" />
                  </div>
                </div>
              </div>
              <div className={classNames('col-lg-6 col-md-6 col-sm-12 col-12', styles.col)}>
                <InfoBox
                  title="NFT Info"
                  rows={nftInfo}
                  data={data.nftInfo}
                  className={styles['first-info-box']}
                />
                <InfoBox
                  title="Owner Info"
                  rows={ownerInfo}
                  data={ownerInfoData}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className={classNames(styles['card-2'], styles['card-tabs'])}>
                  <CTabs
                    tabs={tabs}
                    tabContent={NFTDetailsTabContent}
                    className={styles.tabs}
                    onChange={handleChangeTab}
                    customTabProps={{
                      lusiData: data,
                    }}
                  />
                </div>
                <CSeeAllContentsButton
                  className={styles['all-btn']}
                  link={generateLink()}
                  content={tab === 'offer' ? 'See all offers' : 'See all trades'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
