import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import AuctionContainer from 'containers/auction/AuctionContainer';
import {
  useCallback, useState, useEffect,
} from 'react';
import urlMaker from 'helpers/urlMaker';
import Breadcrumb from 'components/BreadCrumb';
import Button from 'components/Button';
import { extractLogoByToken } from 'helpers/asset';
import AuctionLineChart from 'containers/auction/SingleAuction/AuctionLineChart';
import InfoBox from 'components/InfoBox';
import ArrowRight from 'assets/images/arrowRight';
import CTabs from 'components/CTabs';
import Input from 'components/Input';
import { getAuctionStats } from 'api/auction';
import { openModalAction } from 'actions/modal';
import { useDispatch } from 'react-redux';
import numeral from 'numeral';
import minimizeAddress from 'helpers/minimizeAddress';
import useIsLogged from 'hooks/useIsLogged';
import BN from 'helpers/BN';
import humanAmount from 'helpers/humanAmount';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import { STATUS_NAMES } from 'containers/auction/consts';
import SendBidModal from './SendBidModal';
import AuctionDetailTabContent from './SingleAuctionTabContent';
import CountdownComponent from './Countdown';
import styles from './styles.module.scss';

const SingleAuction = ({ auction, pageName, assetCode }) => {
  const [currentTab, setCurrentTab] = useState('bid');
  const [searchQuery, setSearchQuery] = useState(null);
  const [auctionLineChartData, setAuctionLineChartData] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const dispatch = useDispatch();
  const isLogged = useIsLogged();

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleSearchInWinners = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };

  useEffect(() => {
    getAuctionStats(auction.id).then((res) => {
      let auctionAmounts = res
        ?.data.steps.map((item) => new BN(item.amount).div(10 ** 7).toString());
      const auctionPrices = res?.data.steps.map((item) => item.price);
      if (!auctionAmounts) {
        auctionAmounts = [0, 0];
      }

      setAuctionLineChartData({ auctionAmounts, auctionPrices, assetCode });
    });
  }, []);

  const handleSendBid = () => {
    dispatch(
      openModalAction({
        modalProps: { title: 'Send Bid' },
        content: (
          <SendBidModal
            baseToken={{ code: auction.assetCode, issuer: auction.assetIssuer }}
            basePrice={auction.basePrice}
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
      render: () => (<div>{`${pageName.charAt(0).toUpperCase() + pageName.slice(1)}(${assetCode})`}</div>),
    },
  ];

  const auctionAssetInfo = [
    {
      title: 'Asset code',
      render: (auctionDetails) => (
        <>
          <Image src={extractLogoByToken({ code: auctionDetails.assetCode, issuer: auctionDetails.assetIssuer })} height={22} width={22} className="rounded-circle" alt="logo" />
          <div className="ml-1">{auctionDetails.assetCode}</div>
        </>
      ),
    },
    { title: 'Asset issuer', render: (auctionDetails) => <a className={styles['asset-link']} href={generateAddressURL(auctionDetails.assetIssuer)} target="_blank" rel="noreferrer">{minimizeAddress(auctionDetails.assetIssuer)}</a> },
    { title: 'Amount to sell', render: (auctionDetails) => `${numeral(auctionDetails.amountToSell).format('0,0')} ${auctionDetails.assetCode}` },
  ];

  const auctionInfo = [
    {
      title: 'Period',
      render: (auctionDetails) => (
        <CountdownComponent countdownDetails={auctionDetails} />
      ),
    },
    {
      title: 'Base price',
      tooltip: 'You must set the price of your bid equal to or higher than this number. Otherwise, your bid will not be valid.',
      render: (auctionDetails) => `${auctionDetails.basePrice} XLM`,
    },
    {
      title: 'Bids',
      tooltip: 'This shows the total amount of bids',
      render: (auctionDetails) => {
        const [baseAuctionAssetCode, setBaseAuctionAssetCode] = useState('XLM');
        let valueToShow = '';

        if (baseAuctionAssetCode === 'XLM') {
          valueToShow = `${humanAmount(new BN(auctionDetails.totalBids).div(10 ** 7).toFixed(7))} XLM`;
        } else {
          valueToShow = `${humanAmount(new BN(auctionDetails.totalAmount).div(10 ** 7))} ${auctionDetails.assetCode}`;
        }

        return (
          <span>
            {valueToShow}
            <span
              className="icon-arrow-repeat"
              style={{ cursor: 'pointer', marginLeft: 3, color: '#8d8f9a' }}
              onClick={() => setBaseAuctionAssetCode((old) => (old === 'XLM' ? auctionDetails.assetCode : 'XLM'))}
            />
          </span>
        );
      },
    },
  ];

  const singleAuctionTabs = [
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
        onChange={handleSearchInWinners}
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
    <AuctionContainer
      title={`${auction.title} auction | Lumenswap`}
    >
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <Breadcrumb
                data={breadCrumbData}
                spaceBetween={8}
              />
              {isLogged && auction.status === STATUS_NAMES.live
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
                  <AuctionLineChart chartData={auctionLineChartData} height={300} />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={classNames(styles.card, 'mt-lg-0 mt-md-4 mt-sm-4 mt-4')}>
                  <InfoBox title="Asset info" rows={auctionAssetInfo} data={auction} />
                </div>
                <div className={classNames(styles.card, 'mt-4')}>
                  <InfoBox title="Auction info" rows={auctionInfo} data={auction} />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className={classNames(styles.card, styles['card-table'])}>
                  <CTabs
                    tabs={singleAuctionTabs}
                    tabContent={AuctionDetailTabContent}
                    className={styles.tabs}
                    onChange={handleTabChange}
                    extraComponent={SearchInput}
                    customTabProps={{
                      searchQuery,
                      assetCode,
                      auctionStatus: auction.status,
                      auctionId: auction.id,
                      assetIssuer: auction.assetIssuer,
                      basePrice: auction.basePrice,
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
    </AuctionContainer>
  );
};

export default SingleAuction;
