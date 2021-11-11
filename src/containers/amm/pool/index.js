import Head from 'next/head';
import classNames from 'classnames';
import AMMHeader from 'components/AMMHeader';
import CChart from 'components/CChart';
import * as echarts from 'echarts';
import moment from 'moment';
import React, { useState } from 'react';
import { chartData } from 'api/chartsFakeData';
import styles from './styles.module.scss';
import PoolData from './poolData';

const { barData, lineData, date } = chartData;

const tvlOptions = {
  // tooltip: {
  //   trigger: 'axis',
  //   formatter(params) {
  //     params = params[0];
  //     const date = new Date(params.name);
  //     return (
  //       `${date.getDate()
  //       }/${
  //         date.getMonth() + 1
  //       }/${
  //         date.getFullYear()
  //       } : ${
  //         params.value[1]}`
  //     );
  //   },
  //   axisPointer: {
  //     animation: false,
  //   },
  // },
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
      barWidth: 5,
      data: barData,
      itemStyle: {
        color: '#0e41f5', borderColor: '#fff',
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
  return (
    <CChart
      options={volumeOptions}
      onEvents={{
        mouseover: (params) => setCurrentVolume(barData[params.dataIndex]),
        mouseout: () => setCurrentVolume(100),
      }}
      height="117px"
    />
  );
}

const MemuVolumeChart = React.memo(VolumeChart);

const PoolPage = () => {
  const [currentVolume, setCurrentVolume] = useState(100);

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
                    <div className={styles['tvl-chart']}><span className={styles['volume-chart-number']}>2b</span>
                      <span className={styles['tvl-chart-text']}>TVL</span>
                    </div>
                    <span className={styles['tvl-chart-time']}>Nov,23</span>
                  </div>
                  <div className={styles.chart}><CChart options={tvlOptions} height="117px" /></div>
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
                  <div className={styles.chart}>
                    <MemuVolumeChart setCurrentVolume={setCurrentVolume} />
                  </div>
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
