import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import ObmHeader from 'components/ObmHeader';
import Arrow from 'assets/images/arrowRight';
import Button from 'components/Button';
import BasicList from 'components/BasicList';
import CTabs from 'components/CTabs';
import Table from 'components/Table';
import ModalDialog from 'components/ModalDialog';
import SetNFTPrice from 'blocks/SetNFTPrice';
import imgSrc from 'assets/images/nft-sample-2.png';

import styles from './styles.module.scss';

const NFTDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const nftInfo = [
    { subject: 'Price', info: '10,000 LSP' },
    {
      subject: 'Asset', info: `Lusi #${router.query.id}`, link: '/', external: true,
    },
    {
      subject: 'IPFs hash', info: '0xdD467…E06b4fA', link: '/', external: false,
    },
  ];
  const ownerInfo = [
    { subject: 'Address', info: '0xdd467…3d4253d' },
    { subject: 'Twitter', info: '@username', link: '/' },
    { subject: 'Telegram', info: '@username', link: '/' },
  ];

  const offerTableHeader = ['Address', 'Date', 'Amount'];
  const offerTableRow = (
    <tr>
      <td><a href="/">Gi9nf8ie…k5Tnd5s3</a></td>
      <td>1 min ago</td>
      <td>2300 LSP</td>
    </tr>
  );

  const tradeTableHeader = ['Buyer', 'Seller', 'Amount'];
  const tradeTableRow = (
    <tr>
      <td><a href="/">Gi9nf8ie…k5Tnd5s3</a></td>
      <td><a href="/">Gi9nf8ie…k5Tnd5s3</a></td>
      <td>2300 LSP</td>
    </tr>
  );

  const tabs = [
    { title: 'Offers', id: 'offer' },
    { title: 'Trades', id: 'trade' },
  ];
  const tabContent = ({ tab }) => {
    if (tab === 'offer') {
      return (
        <Table
          tableRows={Array(10).fill(offerTableRow)}
          tableHead={offerTableHeader}
          className={styles.table}
          verticalScrollHeight={345}
        />
      );
    }
    return (
      <Table
        tableRows={Array(10).fill(tradeTableRow)}
        tableHead={tradeTableHeader}
        className={styles.table}
        verticalScrollHeight={345}
      />
    );
  };

  return (
    <div className="container-fluid">
      <Head>
        <title>NFT | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">

            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.title}>My lusi <Arrow /> Lusi #{router.query.id}</h1>
              <Button
                variant="primary"
                content="Place an offer"
                fontWeight={500}
                className={styles.btn}
                onClick={() => setShowModal(true)}
              />
              {showModal
              && (
              <ModalDialog
                show={showModal}
                setShow={setShowModal}
                title="Set a price"
                className="main"
              >
                <SetNFTPrice mode="set" />
              </ModalDialog>
              )}
            </div>

            <div className={classNames('row', styles.row)}>
              <div className={classNames('col-lg-6 col-md-12 col-sm-12 col-12', styles.col)}>
                <div className={classNames(styles.card, styles['card-nft'])}>
                  <div className="d-flex justify-content-center">
                    <Image src={imgSrc} width={342} height={342} />
                  </div>
                </div>
              </div>
              <div className={classNames('col-lg-6 col-md-12 col-sm-12 col-12', styles.col)}>
                <div className={classNames(styles.card, styles['card-nft-info'])}>
                  <BasicList title="NFT Info" items={nftInfo} />
                </div>
                <div className={classNames(styles.card, styles['card-nft-info'])}>
                  <BasicList title="Owner Info" items={ownerInfo} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className={classNames(styles.card, styles['card-tabs'])}>
                  <CTabs
                    tabs={tabs}
                    tabContent={tabContent}
                    className={styles.tabs}
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
