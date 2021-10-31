import Head from 'next/head';
import classNames from 'classnames';
import numeral from 'numeral';
import NFTHeader from 'components/NFTHeader';
import NftStatsChart from 'containers/nft/NftStatsChart';
import CStatistics, { Info } from 'components/CStatistics';
import fetchNFTStats from 'api/nftStatsAPI';
import { useState, useEffect } from 'react';
import Loading from 'components/Loading';
import styles from './styles.module.scss';

const Container = ({ children }) => (
  <div className="container-fluid">
    <Head>
      <title>NFT Stats | Lumenswap</title>
    </Head>
    <NFTHeader />
    {children}
  </div>
);

const NFTStats = () => {
  const [statsData, setStatsData] = useState(null);

  const statsInfo = [
    {
      title: 'Volume 24h',
      tooltip: 'tooltip',
      content: <Info text="LSP" number={numeral(statsData?.info.volume24h).format('0,0')} className={styles['statistics-info']} />,
    },
    {
      title: 'Volume 7d',
      tooltip: 'tooltip',
      content: <Info text="LSP" number={numeral(statsData?.info.volume7d).format('0,0')} className={styles['statistics-info']} />,
    },
    {
      title: 'Total number of trades',
      tooltip: 'tooltip',
      content: <Info number={numeral(statsData?.info.total).format('0,0')} className={styles['statistics-info']} />,
    },
  ];

  useEffect(() => {
    fetchNFTStats().then((data) => setStatsData(data));
  }, []);

  if (!statsData) {
    return (
      <Container>
        <div className={styles['loading-container']}>
          <Loading size={48} />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>Stats</h1>
            <div className={styles.statistics}>
              <CStatistics className={styles['c-statistics']} blocks={statsInfo} />
            </div>
            <div className={classNames(styles.card, styles['card-chart'])}>
              <div>Volume</div>
              <div className="row flex-nowrap mt-5 align-items-end">
                <div className="col">
                  <NftStatsChart
                    data={statsData?.chart.data}
                    date={statsData?.chart.date}
                    showLabel={false}
                  />
                </div>
                <div className="col-auto">
                  <div className={styles.date}>
                    Date
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NFTStats;
