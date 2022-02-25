import Head from 'next/head';
import classNames from 'classnames';
import numeral from 'numeral';
import NftStatsChart from 'containers/nft/stats/NftStatsChart';
import CStatistics, { Info } from 'components/CStatistics';
import fetchNFTStats from 'api/nftStatsAPI';
import { useState, useEffect } from 'react';
import Loading from 'components/Loading';
import moment from 'moment';
import humanizeAmount from 'helpers/humanizeAmount';
import BN from 'helpers/BN';
import ServerSideLoading from 'components/ServerSideLoading';
import { fetchNFTActivity } from 'api/nft';
import CTable from 'components/CTable';
import tableHeaders from './tableHeaders';
import NFTHeader from '../NFTHeader';
import styles from './styles.module.scss';

const Container = ({ children }) => (
  <div className="container-fluid">
    <Head>
      <title>Stats | Lumenswap</title>
    </Head>
    <NFTHeader />
    {children}
  </div>
);

const NFTStats = () => {
  const [activity, setActivity] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [statsVolumeInfo, setStatsVolumeInfo] = useState({
    currentTime: Date.now(),
    currentVolume: 0,
  });

  const statsInfo = [
    {
      title: 'Volume 24h',
      content: <Info text="NLSP" number={humanizeAmount(new BN(statsData?.info.volume24h).div(10 ** 7).toFixed(7))} className={styles['statistics-info']} />,
    },
    {
      title: 'Volume 7d',
      content: <Info text="NLSP" number={humanizeAmount(new BN(statsData?.info.volume7d).div(10 ** 7).toFixed(7))} className={styles['statistics-info']} />,
    },
    {
      title: 'Total number of trades',
      content: <Info number={numeral(statsData?.info.total).format('0,0')} className={styles['statistics-info']} />,
    },
  ];

  const tableLoading = activity === null;

  useEffect(() => {
    fetchNFTStats().then((data) => setStatsData(data));
    fetchNFTActivity().then((data) => setActivity(data.data));
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
      <ServerSideLoading>
        <div className={classNames('layout main', styles.main)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <h1 className={styles.title}>Stats</h1>
              <div className={styles.statistics}>
                <CStatistics className={styles['c-statistics']} blocks={statsInfo} />
              </div>
              <div className={classNames(styles.card, styles['card-chart'])}>
                <div className={styles['chart-header-info']}>
                  <div className={styles['volume-info']}>
                    <span className={styles['volume-info-number']}>{humanizeAmount(new BN(statsVolumeInfo.currentVolume).div(10 ** 7).toFixed(7))} NLSP</span>
                    <span className={styles['volume-info-text']}>Volume 24h</span>
                  </div>
                  <span className={styles['date-chart']}>
                    {moment(statsVolumeInfo.currentTime).utc().format('MMM, DD')}
                  </span>
                </div>
                <div className={classNames('row flex-nowrap align-items-end', styles['chart-container'])}>
                  <div className="col">
                    <NftStatsChart
                      data={statsData?.chart}
                      setStatsVolumeInfo={setStatsVolumeInfo}
                    />
                  </div>
                </div>
              </div>

              <p className={styles.activityTitle}>Last Activity</p>
              <div className={styles.tableContainer}>
                <CTable
                  rowFix={{ rowNumbers: 10, rowHeight: 55, headerRowHeight: 49 }}
                  className={styles.table}
                  columns={tableHeaders}
                  dataSource={activity}
                  noDataMessage="There is no activity"
                  loading={tableLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default NFTStats;
