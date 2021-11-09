import Head from 'next/head';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import urlMaker from 'helpers/urlMaker';
import AuctionHeader from 'components/AuctionHeader';
import Breadcrumb from 'components/BreadCrumb';
import Button from 'components/Button';
import LineChart from 'components/LineChart';
import InfoBox from 'components/InfoBox';
import ArrowRight from 'assets/images/arrowRight';
import Refresh from 'assets/images/refresh';
import CTabs from 'components/CTabs';
import Input from 'components/Input';
import ModalDialog from 'components/ModalDialog';
import SendBid from 'blocks/SendBid';
import sampleSrc from 'assets/images/btc-logo.png';
import AuctionDetailTabContent from './AuctionDetailTabContent';

import styles from './styles.module.scss';

const AuctionDetail = () => {
  const [currentTab, setCurrentTab] = useState('bid');
  const [show, setShow] = useState(false);

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Auction Board | Lumenswap</title>
      </Head>
      <AuctionHeader />
      {children}
    </div>
  );

  const breadCrumbData = [
    {
      name: 'Auction',
      url: urlMaker.auction.root(),
    },
    {
      render: () => (<div>Rabet(RBT)</div>),
    },
  ];

  const assetInfo = [
    {
      title: 'Asset code',
      render: () => (
        <>
          <Image src={sampleSrc} height={22} width={22} className="rounded-circle" alt="logo" />
          <div className="ml-1">RBT</div>
        </>
      ),
    },
    { title: 'Asset issuer', render: () => 'T4u8…B7Ur' },
    { title: 'Amount to sell', tooltip: 'some data', render: () => '1,000,000 RBT' },
  ];

  const auctionInfo = [
    {
      title: 'Period',
      render: () => (
        <div className={styles.period}>
          22 Oct 2021
          <div className={styles['arrow-icon']}><ArrowRight /></div>
          22 Nov 2021
          <div className={styles['refresh-icon']}><Refresh /></div>
        </div>
      ),
    },
    { title: 'Base price', render: () => '0.3 XLM' },
    { title: 'Bids', tooltip: 'some data', render: () => '12,000 XLM' },
  ];

  const tabs = [
    { title: 'Bids', id: 'bid' },
    { title: 'Winners', id: 'winner' },
  ];

  const SearchInput = useCallback(() => (
    <div className={styles.input}>
      <Input
        type="text"
        placeholder="Enter your address"
        height={40}
        fontSize={14}
      />
    </div>
  ), []);

  return (
    <Container>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <Breadcrumb
                data={breadCrumbData}
              />
              <Button
                className={styles.btn}
                content="Send Bid"
                variant="primary"
                onClick={() => setShow(true)}
              />
              {show
              && (
              <ModalDialog show={show} setShow={setShow} className="main" title="Send Bid">
                <SendBid setShow={setShow} />
              </ModalDialog>
              )}
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={classNames(styles.card, styles.chart)}>
                  <LineChart height={300} />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={classNames(styles.card, 'mt-lg-0 mt-md-4 mt-sm-4 mt-4')}>
                  <InfoBox title="Asset info" rows={assetInfo} />
                </div>
                <div className={classNames(styles.card, 'mt-4')}>
                  <InfoBox title="Auction info" rows={auctionInfo} />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className={classNames(styles.card, styles['card-table'])}>
                  <CTabs
                    tabs={tabs}
                    tabContent={AuctionDetailTabContent}
                    className={styles.tabs}
                    onChange={(tab) => setCurrentTab(tab)}
                    extraComponent={SearchInput}
                  />
                </div>
                <Link href="/">
                  <a className={styles['link-see-all']}>
                    See all {currentTab === 'bid' ? 'offers' : 'winners'}
                    <ArrowRight />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuctionDetail;
