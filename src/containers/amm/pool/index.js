import Head from 'next/head';
import classNames from 'classnames';
import AMMHeader from 'containers/amm/AMMHeader';
import React, { useEffect, useState } from 'react';
import { getAmmOverallPoolStats } from 'api/amm';
import ServerSideLoading from 'components/ServerSideLoading';
import useCurrentTheme from 'hooks/useCurrentTheme';
import styles from './styles.module.scss';
import AMMOverallTVLChart from './AMMOverallTVLChart';
import AMMOverallVolumeChart from './AMMOverallVolumeChart';
import PoolData from './poolData';

const PoolPage = () => {
  const [chartData, setChartData] = useState(null);
  const currentTheme = useCurrentTheme();

  useEffect(() => {
    getAmmOverallPoolStats().then((res) => {
      setChartData(res);
    });
  }, []);

  return (
    <div className="container-fluid">
      <Head>
        <title>Pools | Lumenswap</title>
      </Head>
      <AMMHeader />
      <ServerSideLoading>
        <div className={classNames('layout main', styles.main)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12 px-xl-5 px-lg-3 px-md-3 px-sm-3 px-3">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className={styles.label}>Pools</h1>
              </div>
              <div className="row">
                <AMMOverallTVLChart
                  currentTheme={currentTheme}
                  chartData={chartData}
                />
                <AMMOverallVolumeChart
                  currentTheme={currentTheme}
                  chartData={chartData}
                />
              </div>
              <h1 className={styles['label-second']}>Pools</h1>
              <PoolData />
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </div>
  );
};

export default PoolPage;
