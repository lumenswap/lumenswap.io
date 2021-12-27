import React from 'react';
import Head from 'next/head';
import ObmHeader from 'containers/obm/ObmHeader';
import topPairIcon from 'assets/images/top-pair.svg';
import Image from 'next/image';
import { extractInfoByToken } from 'helpers/asset';
import ServerSideLoading from 'components/ServerSideLoading';
import MarketData from './MarketData';
import styles from './styles.module.scss';
import TopPair from './TopPair';

const MarketPage = ({ assets }) => {
  const sortedAssets = assets?.data.sort((a, b) => b.change24h - a.change24h);
  const topChangeAssets = sortedAssets.slice(0, 3).map((pair) => {
    console.log(pair);
    const mainPair = {
      ...pair,
      baseLogo: extractInfoByToken({ code: pair.baseAssetCode, issuer: pair.baseAssetIssuer }).logo,
      counterLogo: extractInfoByToken({
        code: pair.counterAssetCode,
        issuer: pair.counterAssetIssuer,
      }).logo,
    };
    return mainPair;
  });

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Market | Lumenswap</title>
        </Head>
        <ObmHeader />
      </div>
      <ServerSideLoading>
        <div className={styles.main}>
          <div className={styles['top-pair-details']}>
            <div className="row">
              <div className="col-lg-2 col-md-3 col-12 pr-0">
                <div className={styles['top-pair-details-info']}>
                  <div className={styles['top-pair-details-image']}><Image src={topPairIcon} width={22} height={22} /></div>
                  <span className={styles['top-pair-details-text']}>Top Pair Gainers</span>
                </div>
              </div>
              <div className="col-12 col-lg-10 col-md-12">
                <div className="row">
                  {topChangeAssets.map((pair, i) => (
                    <TopPair
                      info={`${pair.baseAssetCode}/${pair.counterAssetCode}`}
                      number={i + 1}
                      images={[pair.baseLogo, pair.counterLogo]}
                      percentage={pair.change24h}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.title}>
            <h1 className={styles.market}>Market</h1>
          </div>
          <MarketData assets={assets} />
        </div>
      </ServerSideLoading>
    </>
  );
};

export default MarketPage;
