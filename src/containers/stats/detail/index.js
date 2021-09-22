import React, { useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import ObmHeader from 'components/ObmHeader';

import ArrowRight from 'assets/images/arrowRight';
import CurrencyPair from 'components/CurrencyPair';
import btcLogo from 'assets/images/btc-logo.png';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import TVLChart from 'components/TVLChart';
import ButtonGroup from 'components/ButtonGroup';
import VolumeChart from 'components/VolumeChart';

import styles from './styles.module.scss';

const grid1 = 'col-xl-7 col-lg-6 col-md-6 col-sm-12 col-12';
const grid2 = 'col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column';

const StatsDetails = () => {
  const router = useRouter();
  const tokens = router.query.token;
  const [activeButton, setActiveButton] = useState('');

  const setActiveChart = () => {
    if (activeButton === 'tvl') {
      return <TVLChart />;
    }
    return <VolumeChart />;
  };

  return (
    <div className="container-fluid pb-5">
      <Head>
        <title>{tokens && `${tokens[0]}/${tokens[1]}`} | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-11 col-md-12 col-sm-12 col-12">
            <h1 className={styles.label}>
              Stats
              <div className="mx-2">
                <ArrowRight />
              </div>
              <CurrencyPair size={26} source={[btcLogo, usdLogo]} />
              <div className="ml-2">{tokens && `${tokens[0]}/${tokens[1]}`}</div>
            </h1>
            <div className="row">
              <div className={classNames(grid1, 'position-relative')}>
                <div className={styles['button-group']}>
                  <ButtonGroup
                    buttons={[{ value: 'volume', label: 'Volume' }, { value: 'tvl', label: 'TVL' }]}
                    activeIndex={0}
                    setValue={setActiveButton}
                  />
                </div>
                <div className={classNames(styles.card, styles['card-chart'])}>
                  {setActiveChart()}
                </div>
              </div>
              <div className={grid2}>
                <div className={classNames(styles.card, styles['card-tvl'])}>
                  <div className={styles['card-section']}>
                    <div className={styles['card-title']}>TVL</div>
                    <div className={styles['card-value']}>$500</div>
                  </div>
                  <div className={styles['card-pairs']}>
                    <div className={styles.pair}>10 USDC</div>
                    <div className={styles.pair}>100 XLM</div>
                  </div>
                </div>
                <div className={classNames(styles.card, styles['card-fee'])}>
                  <div className={styles['card-section']}>
                    <div className={styles['card-title']}>Volume 24h</div>
                    <div className={styles['card-value']}>$10</div>
                  </div>
                  <div className={styles['card-section']}>
                    <div className={styles['card-title']}>24 Fee</div>
                    <div className={styles['card-value']}>$10</div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className={classNames(styles.label, styles['label-bold'])}>Swap</h2>
            <div className={classNames(styles.card, styles['card-swap'])}>
              <div className={styles.empty}>There is no swap</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDetails;
