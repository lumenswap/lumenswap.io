import Head from 'next/head';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import ServerSideLoading from 'components/ServerSideLoading';
import { useCallback, useState, useEffect } from 'react';
import urlMaker from 'helpers/urlMaker';
import Breadcrumb from 'components/BreadCrumb';
import Button from 'components/Button';
import { extractLogoByToken } from 'helpers/asset';
import LineChart from 'containers/auction/detail/LineChart';
import InfoBox from 'components/InfoBox';
import ArrowRight from 'assets/images/arrowRight';
import CTabs from 'components/CTabs';
import Input from 'components/Input';
import SendBid from 'blocks/SendBid';
import { getAuctionStats } from 'api/auction';
import { openModalAction } from 'actions/modal';
import { useDispatch } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
import minimizeAddress from 'helpers/minimizeAddress';
import useIsLogged from 'hooks/useIsLogged';
import BN from 'helpers/BN';
import humanAmount from 'helpers/humanAmount';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
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
  const [refreshData, setRefreshData] = useState(false);

  const dispatch = useDispatch();
  const isLogged = useIsLogged();

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };

  useEffect(() => {
    getAuctionStats(infoData.id).then((res) => {
      let amounts = res?.data.steps.map((item) => new BN(item.amount).div(10 ** 7).toString());
      const prices = res?.data.steps.map((item) => item.price);
      if (!amounts) {
        amounts = [0, 0];
      }

      setChartData({ amounts, prices, assetCode });
    });
  }, []);

  const handleSendBid = () => {
    dispatch(
      openModalAction({
        modalProps: { title: 'Send Bid' },
        content: (
          <SendBid
            tokenA={{ code: infoData.assetCode, issuer: infoData.assetIssuer }}
            basePrice={infoData.basePrice}
            reloadData={() => setRefreshData((prev) => !prev)}
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
          <Image src={extractLogoByToken({ code: data.assetCode, issuer: data.assetIssuer })} height={22} width={22} className="rounded-circle" alt="logo" />
          <div className="ml-1">{data.assetCode}</div>
        </>
      ),
    },
    { title: 'Asset issuer', render: (data) => <a href={generateAddressURL(data.assetIssuer)} target="_blank" rel="noreferrer">{minimizeAddress(data.assetIssuer)}</a> },
    { title: 'Amount to sell', tooltip: 'some data', render: (data) => `${numeral(data.amountToSell).format('0,0')} ${data.assetCode}` },
  ];

  const auctionInfo = [
    {
      title: 'Period',
      render: (data) => (
        <div className={styles.period}>
          {moment(data.startDate).format('D MMM Y')}
          <div className={styles['arrow-icon']}><ArrowRight /></div>
          {moment(data.endDate).format('D MMM Y')}
        </div>
      ),
    },
    { title: 'Base price', render: (data) => `${data.basePrice} XLM` },
    { title: 'Bids', tooltip: 'some data', render: (data) => `${humanAmount(new BN(data.totalBids).div(10 ** 7).toFixed(7))} XLM` },
  ];

  const tabs = [
    { title: 'Bids', id: 'bid' },
    { title: 'Winners', id: 'winner' },
  ];

  const SearchInput = useCallback(() => (
    currentTab === 'winner' && (
    <div className={styles.input}>
      <Input
        type="text"
        placeholder="Enter your address"
        height={40}
        fontSize={14}
        onChange={handleSearch}
      />
    </div>
    )
  ), [currentTab]);
  function generateLink() {
    if (currentTab === 'bid') {
      return urlMaker.auction.singleAuction.bids(pageName);
    }
    return urlMaker.auction.singleAuction.winners(pageName);
  }

  return (
    <Container>
      <ServerSideLoading>
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
                      customTabProps={{
                        searchQuery,
                        assetCode,
                        auctionId: infoData.id,
                        assetIssuer: infoData.assetIssuer,
                        basePrice: infoData.basePrice,
                        refreshData,
                        setRefreshData,
                      }}
                    />
                  </div>
                  <Link href={generateLink()}>
                    <a className={styles['link-see-all']}>
                      See all {currentTab === 'bid' ? 'bids' : 'winners'}
                      <ArrowRight />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default AuctionDetail;
