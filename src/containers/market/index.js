import React from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import MarketData from './MarketData';
import styles from './styles.module.scss';

const MarketPage = ({ assets }) => (
  <>
    <div className="container-fluid">
      <Head>
        <title>Market | Lumenswap</title>
      </Head>
      <Header />
    </div>
    <div className={styles.main}>
      <div className={styles.title}>
        <h1 className={styles.market}>Market</h1>
      </div>
      <MarketData assets={assets} />
    </div>
  </>
);

export default MarketPage;
