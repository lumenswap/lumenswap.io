import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import NFTHeader from 'components/NFTHeader';
import BN from 'helpers/BN';
import Button from 'components/Button';
import BigLogo from 'assets/images/BigLogo';
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
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import Submitting from 'components/Submitting';
import isSameAsset from 'helpers/isSameAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import { fetchOfferAPI, fetchOffersOfAccount } from 'api/stellar';
import humanAmount from 'helpers/humanAmount';
import NLSP from 'tokens/NLSP';
import styles from './styles.module.scss';
import NFTDetailsTabContent from './NFTDetailsTabContent';
import SetOrUpdateNFTPrice from './SetOrUpdateNFTPrice';
import getLusiOwner from './getLusiOwner';

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

function loadLusiOffers(data, setLusiOffers) {
  fetchOfferAPI(
    getAssetDetails({ code: data.assetCode, issuer: process.env.REACT_APP_LUSI_ISSUER }),
    getAssetDetails(NLSP),
    {
      limit: 10,
      order: 'desc',
    },
  ).then((res) => res
    .data
    ._embedded
    .records)
    .then((res) => {
      setLusiOffers(res);
    });
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
  const [lusiOffers, setLusiOffers] = useState(null);

  useEffect(() => {
    loadLusiOffers(data, setLusiOffers);
  }, []);

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
    getLusiOwner(`Lusi${lusiId}`).then((ownerInfo) => {
      setOnwerInfoData(ownerInfo);
    });
  }, []);

  const nftInfo = [
    {
      title: 'Price',
      tooltip: 'tooltip',
      render: (info) => {
        if (!new BN(info.price).isZero()) {
          return (
            <span className={styles.infos}>
              <div className={styles.logo}><BigLogo color="#DF4886" />
              </div>{humanAmount(new BN(info.price).div(10 ** 7).toFixed(7))} NLSP
            </span>
          );
        }

        return <span className={styles.infos}>Not set yet</span>;
      },
    },
    {
      title: 'Asset',
      externalLink: {
        title: `${data.nftInfo.asset}`,
        url: assetGenerator(data.assetCode, process.env.REACT_APP_LUSI_ISSUER),
      },
    },
    {
      title: 'IPFs hash',
      externalLink: {
        title: `${minimizeAddress(data.nftInfo.ipfHash)}`,
        url: ipfsHashGenerator(data.nftInfo.ipfHash),
      },
    },
  ];

  const ownerInfo = [
    {
      title: 'Address',
      externalLink: {
        title: ownerInfoData?.address ? `${minimizeAddress(ownerInfoData?.address)}` : '-',
        url: ownerInfoData?.address ? generateAddressURL(ownerInfoData?.address) : '-',
      },
    },
    {
      title: 'Twitter',
      render: (info) => (info?.twitter ? (
        <a
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none' }}
          className={styles['info-link']}
          href={twitterUrlMaker(info?.twitter)}
        >
          @{info?.twitter}
        </a>
      ) : <span className={styles['no-link']}>-</span>),
    },
    {
      title: 'Telegram',
      render: (info) => (info?.telegram ? (
        <a
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none' }}
          className={styles['info-link']}
          href={telegramUrlMaker(info?.telegram)}
        >
          @{info?.telegram}
        </a>
      ) : <span className={styles['no-link']}>-</span>),
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
            content: <PlaceNFTOrder
              lusiAssetCode={data.assetCode}
              afterPlace={() => loadLusiOffers(data, setLusiOffers)}
            />,
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
    if (tabId === 'offer') {
      setLusiOffers(null);
      loadLusiOffers(data, setLusiOffers);
    }
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
              <Breadcrumb className={styles.bread} data={breadCrumbData} />
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
                      offers: lusiOffers,
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
