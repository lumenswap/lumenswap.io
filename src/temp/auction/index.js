import { useState, useEffect } from 'react';
import classNames from 'classnames';
import numeral from 'numeral';
import CoinGecko from 'coingecko-api';
import { useSelector } from 'react-redux';

import Header from 'components/Header';
import LineChart from 'components/LineChart';
import AngleRight from 'assets/images/angle-right.svg';
import Button from 'components/Button';
import ModalDialog from 'components/ModalDialog';
import SendBid from 'blocks/SendBid';
import { openConnectModal } from 'actions/modal';
import sevenDigit from 'helpers/sevenDigit';
import BN from 'helpers/BN';
import BidsSection from 'page-scripts/auction/BidsSection';
import aggregateLSPOffer from 'page-scripts/auction/aggregation';

import styles from './styles.module.scss';

function InfoOfBid({
  latestPrice, totalLSP, totalXLM, totalBids, xlmPrice,
}) {
  return (
    <div className="row w-100">
      <div className={classNames('col-lg-3 col-md-4 col-sm-12 col-12 px-0', styles['container-info'])}>
        <div className={styles.block}>
          <div className={styles['title-info']}>Latest bid price</div>
          <div className={styles['number-info']}>{latestPrice} <span>XLM</span></div>
          <div className={styles['value-info']}>${numeral(new BN(latestPrice.replace(',', '')).times(xlmPrice).toString()).format('0,0.[0000]')}</div>
        </div>
      </div>
      <div className={classNames('col-lg-3 col-md-4 col-sm-12 col-12 px-0', styles['container-info'])}>
        <div className={styles.block}>
          <div className={styles['title-info']}>Total amount of bids</div>
          <div className={styles['number-info']}>{totalLSP} <span>LSP</span></div>
          <div className={styles['value-info']}>{totalXLM} XLM</div>
        </div>
      </div>
      <div className={classNames('col-lg-3 col-md-4 col-sm-12 col-12 px-0', styles['container-info'])}>
        <div className={styles.block}>
          <div className={styles['title-info']}>Total number of bids</div>
          <div className={styles['number-info']}>{totalBids}</div>
        </div>
      </div>
    </div>
  );
}

const Auction = () => {
  const [show, setShow] = useState(false);
  const isLogged = useSelector((state) => state.user.logged);
  const [aggData, setAggData] = useState(null);
  const [xlmPrice, setXlmPrice] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await aggregateLSPOffer();
        const CoinGeckoClient = new CoinGecko();
        const coinPrice = await CoinGeckoClient.coins.fetch('stellar');
        setXlmPrice(coinPrice.data.market_data.current_price.usd);
        setAggData(res);
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, []);

  let latestPrice = 0;
  let totalLSP = 0;
  let totalXLM = 0;
  let totalBids = 0;

  if (aggData) {
    totalLSP = numeral(sevenDigit(aggData.totalLSP.toString())).format('0,0.[00000]');
    totalXLM = numeral(sevenDigit(aggData.totalXLM.toString())).format('0,0.[00000]');
    totalBids = numeral(aggData.totalBids).format('0,0');
    latestPrice = numeral(sevenDigit(aggData.latestBid.lspPrice)).format('0,0.[00000]');
  } else {
    totalLSP = '-';
    totalXLM = '-';
    totalBids = '-';
    latestPrice = '-';
  }

  return (
    <div className="container-fluid pb-5">
      <Header />
      <div className="layout-inside mt-4 main">
        <h1 className={styles.title}>LSP Auction</h1>
        <div className="row d-flex align-items-start justify-content-between">
          <div className="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12">
            <p className={styles.desc}>
              Welcome to the Lumenswap auction portal.
              Here you can participate in the LSP auction and view essential information/statistics
            </p>
            <a href="https://medium.com/lumenswap/lsp-auction-is-live-73761669a3f" target="_blank" className={styles.link} rel="noreferrer">Learn more<img src={AngleRight.src} /></a>
          </div>
          <div className="col-xl-4 col-lg-3 col-md-2 col-sm-12 col-12">
            <Button
              variant="primary"
              content="Send Bid"
              className={classNames(styles.btn, 'ml-md-auto ml-sm-0 ml-0 mt-md-0 mt-sm-4 mt-4')}
              onClick={() => {
                if (!isLogged) {
                  openConnectModal();
                } else {
                  setShow(true);
                }
              }}
            />
            <ModalDialog show={show} setShow={setShow} className="main" title="Send Bid">
              <SendBid setShow={setShow} />
            </ModalDialog>
          </div>
        </div>
        {/* info */}
        <div className={classNames(styles.card, styles['card-info'])}>
          <InfoOfBid
            totalBids={totalBids}
            totalLSP={totalLSP}
            latestPrice={latestPrice}
            totalXLM={totalXLM}
            xlmPrice={xlmPrice}
          />
        </div>
        {/* chart */}
        <div className={classNames(styles.card, styles['card-chart'])}>
          <LineChart data={aggData} />
        </div>
        {/* bids */}
        <div className={classNames(styles.card, styles['card-tabs'])}>
          <BidsSection />
        </div>
      </div>
    </div>
  );
};

export default Auction;
