import CChart from 'components/CChart';
import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Loading from 'components/Loading';
import { getOneDayPoolStatsForPoolId } from 'api/amm';
import BN from 'helpers/BN';
import chartIcon from '../../../../assets/images/chart-icon.png';
import ChartDetail from './ChartSection/ChartDetail';
import styles from './styles.module.scss';

const ChartLoading = () => (
  <div className={styles['loading-container-chart']}>
    <Loading size={48} />
  </div>
);

const Chart = ({
  currentChart, setCurrentValue, chartData,
}) => {
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
      data: chartData?.map((i) => i.periodTime),
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
        formatter: (val) => moment(val).utc().format('DD'),
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
        data: chartData?.map((i) => i.tvl),
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
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
        formatter: (val) => moment(val).utc().format('DD'),
      },
      data: chartData?.map((i) => i.periodTime),
      splitLine: {
        show: false,
      },
    },
    yAxis: { show: false, splitLine: { show: false } },
    series: [
      {
        name: 'volume',
        type: 'bar',
        barWidth: Math.max(2, 20 / Math.round(Math.sqrt(chartData?.length))),
        data: chartData?.map((i) => new BN(i.volume).div(10 ** 7).toString()),
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

  const feeOptions = {
    // tooltip: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
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
        formatter: (val) => moment(val).utc().format('DD'),
      },
      data: chartData?.map((i) => i.periodTime),
      splitLine: {
        show: false,
      },
    },
    yAxis: { show: false, splitLine: { show: false } },
    series: [
      {
        name: 'fee',
        type: 'bar',
        barWidth: Math.max(2, 20 / Math.round(Math.sqrt(chartData?.length))),
        data: chartData?.map((i) => new BN(i.volume).div(10 ** 7).times(0.003).toString()),
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

  if (currentChart === 'tvl') {
    return (
      <div className={styles['multi-chart-container']}>
        <CChart
          height="175px"
          onEvents={{
            highlight: (params) => setCurrentValue(chartData[params.batch[0].dataIndex]),
            downplay: () => setCurrentValue(chartData[chartData.length - 1]),
          }}
          options={tvlOptions}
        />
      </div>
    );
  }
  if (currentChart === 'fee') {
    return (
      <div className={styles['multi-chart-container']}>
        <CChart
          onEvents={{
            highlight: (params) => setCurrentValue(chartData[params.batch[0].dataIndex]),
            downplay: () => setCurrentValue(chartData[chartData.length - 1]),
          }}
          options={feeOptions}
          height="175px"
        />
      </div>
    );
  }
  if (currentChart === 'volume') {
    return (
      <div className={styles['multi-chart-container']}>
        <CChart
          onEvents={{
            highlight: (params) => setCurrentValue(chartData[params.batch[0].dataIndex]),
            downplay: () => setCurrentValue(chartData[chartData.length - 1]),
          }}
          options={volumeOptions}
          height="175px"
        />
      </div>
    );
  }
  return null;
};

const MemoCharts = React.memo(Chart);

function PoolMultiCharts({ poolId }) {
  const [currentChart, setCurrentChart] = useState('tvl');
  const [currentValue, setCurrentValue] = useState({
    tvl: 0,
    volume: 0,
  });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getOneDayPoolStatsForPoolId(poolId).then((data) => {
      setChartData(data);
      setCurrentValue(data[data.length - 1]);
    });
  }, []);

  const handleTVL = () => {
    setCurrentChart('tvl');
  };
  const handleVolume = () => {
    setCurrentChart('volume');
  };
  const handleFee = () => {
    setCurrentChart('fee');
  };

 

  if (chartData === []) {
    return (
      <div className={styles['chart-pool']}>
        <div className={styles['chart-icon-container']}><Image src={chartIcon} width={32} height={27} /></div>
        <span>The chart is not available for this pool</span>
      </div>
    );
  }

  return (
    <div className={styles['chart-container']}>
      <div className={styles['chart-header']}>
        <div className={styles.values}>
          <ChartDetail currentChart={currentChart} currentValue={currentValue} />
        </div>
        <div className={styles.btns}>
          <div className={currentChart === 'tvl' ? styles['btn-active'] : styles.btn} onClick={handleTVL}>TVL</div>
          <div className={currentChart === 'volume' ? styles['btn-active'] : styles.btn} onClick={handleVolume}>Volume</div>
          <div className={currentChart === 'fee' ? styles['btn-active'] : styles.btn} onClick={handleFee}>Fee</div>
        </div>
      </div>
      {!chartData ? <ChartLoading /> : <MemoCharts
        currentChart={currentChart}
        setCurrentValue={setCurrentValue}
        chartData={chartData}
      />}
    </div>
  );
}

export default PoolMultiCharts;
