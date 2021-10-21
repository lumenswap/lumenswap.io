import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import classNames from 'classnames';
import NFTHeader from 'components/NFTHeader';
import Button from 'components/Button';
import CTabs from 'components/CTabs';
import { openModalAction, openConnectModal } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import SetNFTPrice from 'blocks/SetNFTPrice';
import minimizeAddress from 'helpers/minimizeAddress';
import InfoBox from 'components/InfoBox';
import {
  generateAddressURL,
  twitterUrlMaker,
  telegramUrlMaker,
  assetGenerator,
  ipfsHashGenerator,
} from 'helpers/explorerURLGenerator';
import numeral from 'numeral';
import BreadCrump from 'components/BreadCrumb';
import NFTDetailsTabContent from './NFTDetailsTabContent';
import styles from './styles.module.scss';

const NFTDetail = ({ id, data }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.logged);

  const nftInfo = [
    {
      title: 'Price',
      tooltip: 'tooltip',
      render: (info) => <span className={styles.infos}>{numeral(info.price).format('0,0')} LSP</span>,
    },
    {
      title: 'Asset',
      tooltip: 'tooltip',
      render: (info) => (
        <span className={styles.infos}>
          <a
            href={assetGenerator(data.asset.code, data.asset.issuer)}
            target="_blank"
            rel="noreferrer"
          >
            {info.asset}
          </a>
        </span>
      ),
    },
    {
      title: 'IPFs hash',
      tooltip: 'tooltip',
      render: (info) => (
        <span className={styles.infos}>
          <a href={ipfsHashGenerator(info.hash)} target="_blank" rel="noreferrer">{minimizeAddress(info.hash)}</a>
        </span>
      ),
    },
  ];
  const ownerInfo = [
    {
      title: 'Address',
      tooltip: 'tooltip',
      render: (info) => (
        <span className={styles.infos}>
          <a href={generateAddressURL(info.address)} target="_blank" rel="noreferrer">{minimizeAddress(info.address)}</a>
        </span>
      ),
    },
    {
      title: 'Twitter',
      tooltip: 'tooltip',
      render: (info) => (
        <span className={styles.infos}>
          <a href={twitterUrlMaker(info.twitter)} target="_blank" rel="noreferrer">{`@${info.twitter}`}</a>
        </span>
      ),
    },
    {
      title: 'Telegram',
      tooltip: 'tooltip',
      render: (info) => (
        <span className={styles.infos}>
          <a href={telegramUrlMaker(info.telegram)} target="_blank" rel="noreferrer">{`@${info.telegram}`}</a>
        </span>
      ),
    },
  ];

  const tabs = [
    { title: 'Offers', id: 'offer' },
    { title: 'Trades', id: 'trade' },
  ];
  const breadCrumpData = {
    item1: 'My lusi',
    item2: `Lusi #${id}`,
  };

  const handlePlaceOffer = () => {
    if (isLogged) {
      dispatch(
        openModalAction({
          modalProps: { title: 'Set a price' },
          content: <SetNFTPrice />,
        }),
      );
    } else {
      dispatch(openConnectModal());
    }
  };

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
              <BreadCrump data={breadCrumpData} />
              <Button
                variant="primary"
                content="Place an offer"
                fontWeight={500}
                className={styles.btn}
                onClick={handlePlaceOffer}
              />
            </div>

            <div className={classNames('row', styles.row)}>
              <div className={classNames('col-lg-6 col-md-12 col-sm-12 col-12', styles.col)}>
                <div className={classNames(styles.card, styles['card-nft'])}>
                  <div className="d-flex justify-content-center">
                    <Image src={data.lusiImage} width={342} height={342} />
                  </div>
                </div>
              </div>
              <div className={classNames('col-lg-6 col-md-12 col-sm-12 col-12', styles.col)}>
                <InfoBox
                  title="NFT Info"
                  rows={nftInfo}
                  data={data.nftInfo}
                  className={styles['first-info-box']}
                />
                <InfoBox
                  title="Owner Info"
                  rows={ownerInfo}
                  data={data.ownerInfo}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className={classNames(styles.card, styles['card-tabs'])}>
                  <CTabs
                    tabs={tabs}
                    tabContent={NFTDetailsTabContent}
                    className={styles.tabs}
                    customTabProps={{
                      lusiId: id,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
