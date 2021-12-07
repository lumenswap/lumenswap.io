import React from 'react';
import Head from 'next/head';
import ObmHeader from 'components/ObmHeader';
import topPairIcon from 'assets/images/top-pair.svg';
import Image from 'next/image';
import defaultTokens from 'tokens/defaultTokens';
import questionLogo from 'assets/images/question.png';
import MarketData from './MarketData';
import styles from './styles.module.scss';
import TopPair from './TopPair';

const MarketPage = ({ assets }) => {
  const hashedDefaultTokens = defaultTokens.reduce((acc, cur) => {
    acc[cur.code] = cur;
    return acc;
  }, {});

  const sortedAssets = assets?.data.sort((a, b) => b.change24h - a.change24h);
  const topChangeAssets = sortedAssets.slice(0, 3).map((asset) => {
    let mainAsset = {
      ...asset,
      baseLogo: questionLogo,
      counterLogo: questionLogo,
    };
    if (hashedDefaultTokens[asset.baseAssetCode]) {
      mainAsset = {
        ...mainAsset,
        baseLogo: hashedDefaultTokens[asset.baseAssetCode].logo,
      };
    }
    if (hashedDefaultTokens[asset.counterAssetCode]) {
      mainAsset = {
        ...mainAsset,
        counterLogo: hashedDefaultTokens[asset.counterAssetCode].logo,
      };
    }
    return mainAsset;
  });

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Market | Lumenswap</title>
        </Head>
        <ObmHeader />
      </div>
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
                {topChangeAssets.map((asset, i) => (
                  <TopPair
                    info={`${asset.baseAssetCode}/${asset.counterAssetCode}`}
                    number={i + 1}
                    images={[asset.baseLogo, asset.counterLogo]}
                    percentage={asset.change24h}
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
    </>
  );
};

export default MarketPage;
