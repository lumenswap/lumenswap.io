import Head from 'next/head';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState, useEffect } from 'react';
import urlMaker from 'helpers/urlMaker';
import Breadcrumb from 'components/BreadCrumb';
import Button from 'components/Button';
import { extractLogoByToken } from 'helpers/asset';
import LineChart from 'components/LineChart';
import InfoBox from 'components/InfoBox';
import ArrowRight from 'assets/images/arrowRight';
import Refresh from 'assets/images/refresh';
import CTabs from 'components/CTabs';
import Input from 'components/Input';
import SendBid from 'blocks/SendBid';
import { fetchAuctionChartData } from 'api/AuctionFakeData';
import { openModalAction } from 'actions/modal';
import { useDispatch } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
import minimizeAddress from 'helpers/minimizeAddress';
import useIsLogged from 'hooks/useIsLogged';
import AuctionHeader from '../AuctionHeader';
import AuctionDetailTabContent from './AuctionDetailTabContent';

import styles from './styles.module.scss';

const Container = ({ children }) => (
  <div className="container-fluid">
    <Head>
      <title>Auction Board | Lumenswap</title>
    </Head>
    <AuctionHeader />
    {children}
  </div>
);

const AuctionDetail = ({ infoData, pageName, assetCode }) => {
  const [currentTab, setCurrentTab] = useState('bid');
  const [searchQuery, setSearchQuery] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [displayLedgers, setDisplayLedgers] = useState(false);

  const dispatch = useDispatch();
  const isLogged = useIsLogged();

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };
  const handleDisplayLedgers = () => {
    setDisplayLedgers((prev) => !prev);
  };
  useEffect(() => {
    fetchAuctionChartData(assetCode).then((data) => setChartData(data));
  }, []);

  const handleSendBid = () => {
    dispatch(
      openModalAction({
        modalProps: { title: 'Send Bid' },
        content: (
          <SendBid
            tokenA={infoData.bidAsset}
          />
        ),
      }),
    );
  };

  const breadCrumbData = [
    {
      name: 'Auction',
      url: urlMaker.auction.root(),
    },
    {
      render: () => (<div>{pageName}</div>),
    },
  ];

  const assetInfo = [
    {
      title: 'Asset code',
      render: (data) => (
        <>
          <Image src={extractLogoByToken(data.asset)} height={22} width={22} className="rounded-circle" alt="logo" />
          <div className="ml-1">{data.asset.code}</div>
        </>
      ),
    },
    { title: 'Asset issuer', render: (data) => `${minimizeAddress(data.asset.issuer)}` },
    { title: 'Amount to sell', tooltip: 'some data', render: (data) => `${numeral(data.asset.sellAmount).format('0,0')} ${data.asset.code}` },
  ];

  const auctionInfo = [
    {
      title: 'Period',
      render: (data) => (
        <div className={styles.period}>
          {displayLedgers ? `${data.auction.startLedger} Ledger` : moment(data.auction.startDate).format('D MMM Y')}
          <div className={styles['arrow-icon']}><ArrowRight /></div>
          {displayLedgers ? `${data.auction.endLedger} Ledger` : moment(data.auction.endDate).format('D MMM Y')}
          <div
            onClick={handleDisplayLedgers}
            className={styles['refresh-icon']}
          ><Refresh />
          </div>
        </div>
      ),
    },
    { title: 'Base price', render: (data) => `${data.auction.basePrice} ${data.auction.baseAssetCode}` },
    { title: 'Bids', tooltip: 'some data', render: (data) => `${numeral(data.auction.bids).format('0,0')} ${data.auction.baseAssetCode}` },
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
        onChange={handleSearch}
      />
    </div>
  ), []);
  function generateLink() {
    if (currentTab === 'bid') {
      return urlMaker.auction.board.bids(pageName);
    }
    return urlMaker.auction.board.winners(pageName);
  }

  return (
    <Container>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <Breadcrumb
                data={breadCrumbData}
                spaceBetween={8}
              />
              {isLogged
              && (
              <Button
                className={styles.btn}
                content="Send Bid"
                variant="primary"
                onClick={handleSendBid}
              />
              )}
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={classNames(styles.card, styles.chart)}>
                  <LineChart chartData={chartData} height={300} />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={classNames(styles.card, 'mt-lg-0 mt-md-4 mt-sm-4 mt-4')}>
                  <InfoBox title="Asset info" rows={assetInfo} data={infoData} />
                </div>
                <div className={classNames(styles.card, 'mt-4')}>
                  <InfoBox title="Auction info" rows={auctionInfo} data={infoData} />
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
                    onChange={handleTabChange}
                    extraComponent={SearchInput}
                    customTabProps={{ searchQuery, assetCode }}
                  />
                </div>
                <Link href={generateLink()}>
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
