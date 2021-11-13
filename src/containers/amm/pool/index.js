import Head from 'next/head';
import classNames from 'classnames';
import AMMHeader from 'components/AMMHeader';
import CChart from 'components/CChart';
import * as echarts from 'echarts';
import moment from 'moment';
import React, { useState } from 'react';
import { chartData } from 'api/chartsFakeData';
import Loading from 'components/Loading';
import styles from './styles.module.scss';
import PoolData from './poolData';

const { barData, lineData, date } = chartData;

const ChartLoading = () => (
  <div className={styles['loading-container-chart']}>
    <Loading size={48} />
  </div>
);

const tvlOptions = {
  tooltip: {
    show: true,
    trigger: 'axis',
    alwaysShowContent: true,
    showContent: true,
    position: [5, 0],
    className: 'echart-tooltip',
    formatter() {
      return null;
    },
  },
  dataZoom: {
    start: 0,
    end: 100,
    type: 'inside',
  },
  xAxis: {
    data: date,
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#656872',
      },
    },
    axisLabel: {
      formatter: (val, index) => moment(parseInt(val, 10)).format('DD'),
    },
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      name: 'TVL',
      type: 'line',
      showSymbol: false,
      data: lineData,
      lineStyle: { backgroundColor: '#0e41f5' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#aab6cc',
          },
          {
            offset: 1,
            color: '#e8f0fe',
          },
        ]),
      },
    },
  ],
};

const volumeOptions = {
  // tooltip: {},
  dataZoom: {
    start: 0,
    end: 100,
    type: 'inside',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter() {
      return null;
    },
  },
  xAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#656872',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      formatter: (val, index) => moment(parseInt(val, 10)).format('DD'),
    },
    data: date,
    splitLine: {
      show: false,
    },
  },
  yAxis: { show: false, splitLine: { show: false } },
  series: [
    {
      name: 'volume',
      type: 'bar',
      barWidth: 2,
      barGap: '100%',
      data: barData,
      itemStyle: {
        color: '#0e41f5', borderColor: '#fff', borderWidth: 0,
      },
      emphasis: {
        focus: 'series',
      },
      animationDelay(idx) {
        return idx * 10;
      },
    },
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate(idx) {
    return idx * 5;
  },
};

function VolumeChart({ setCurrentVolume }) {
  if (!volumeOptions) {
    return <ChartLoading />;
  }
  return (
    <div className={styles.chart}>
      <CChart
        options={volumeOptions}
        onEvents={{
          mouseover: (params) => setCurrentVolume(barData[params.dataIndex]),
          mouseout: () => setCurrentVolume(100),
        }}
        height="117px"
      />
    </div>
  );
}
function TVLChart({ setCurrentTVL }) {
  if (!tvlOptions) {
    return <ChartLoading />;
  }
  return (
    <div className={styles.chart}>
      <CChart
        onEvents={{
          mouseover: (params) => setCurrentTVL(barData[params.dataIndex]),
          mouseout: () => setCurrentTVL(2),
        }}
        options={tvlOptions}
        height="117px"
      />
    </div>
  );
}

const MemoVolumeChart = React.memo(VolumeChart);
const MemoTVLChart = React.memo(TVLChart);

const PoolPage = () => {
  const [currentVolume, setCurrentVolume] = useState(100);
  const [currentTVL, setCurrentTVL] = useState(2);

  return (
    <div className="container-fluid">
      <Head>
        <title>Pools | Lumenswap</title>
      </Head>
      <AMMHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12 px-xl-5 px-lg-3 px-md-3 px-sm-3 px-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.label}>Pools</h1>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className={styles['chart-container']}>
                  <div className={styles['chart-info-container']}>
                    <div className={styles['tvl-chart']}><span className={styles['volume-chart-number']}>{currentTVL}</span>
                      <span className={styles['tvl-chart-text']}>TVL</span>
                    </div>
                    <span className={styles['tvl-chart-time']}>Nov,23</span>
                  </div>
                  <MemoTVLChart setCurrentTVL={setCurrentTVL} />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className={styles['chart-container']}>
                  <div className={styles['chart-info-container']}>
                    <div className={styles['volume-chart']}>
                      <span className={styles['volume-chart-number']}>${currentVolume}</span>
                      <span className={styles['volume-chart-text']}>Volume 24h</span>
                    </div>
                  </div>
                  <MemoVolumeChart setCurrentVolume={setCurrentVolume} />
                </div>
              </div>
            </div>
            <h1 className={styles['label-second']}>Pools</h1>
            <PoolData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolPage;
