import CChart from 'components/CChart';
import * as echarts from 'echarts';
import React, { useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { chartData } from 'api/chartsFakeData';
import Loading from 'components/Loading';
import chartIcon from '../../../../assets/images/chart-icon.png';
import styles from './styles.module.scss';

const { date, lineData, barData } = chartData;
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
      name: 'fee',
      type: 'bar',
      barWidth: 2,
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

const Chart = ({
  currentChart, setCurrentValue, chartsData,
}) => {
  if (currentChart === 'tvl') {
    // if (!chartsData.tvl) {
    //   return <ChartLoading />;
    // }
    return (
      <div className={styles['multi-chart-container']}>
        <CChart
          height="125px"
          onEvents={{
            mouseover: (params) => setCurrentValue(barData[params.dataIndex]),
            mouseout: () => setCurrentValue(326),
          }}
          options={tvlOptions}
        />
      </div>
    );
  }
  if (currentChart === 'fee') {
    // if (!chartsData.fee) {
    //   return <ChartLoading />;
    // }
    return (
      <div className={styles['multi-chart-container']}>
        <CChart
          onEvents={{
            mouseover: (params) => setCurrentValue(barData[params.dataIndex]),
            mouseout: () => setCurrentValue(326),
          }}
          options={feeOptions}
          height="125px"
        />
      </div>
    );
  }
  if (currentChart === 'volume') {
    // if (!chartsData.volume) {
    //   return <ChartLoading />;
    // }
    return (
      <div className={styles['multi-chart-container']}>
        <CChart
          onEvents={{
            mouseover: (params) => setCurrentValue(barData[params.dataIndex]),
            mouseout: () => setCurrentValue(326),
          }}
          options={volumeOptions}
          height="125px"
        />
      </div>
    );
  }
  return null;
};
const MemoCharts = React.memo(Chart);

function PoolMultiCharts({ chartsData }) {
  const [currentChart, setCurrentChart] = useState('tvl');
  const [currentValue, setCurrentValue] = useState(324);

  const handleTVL = () => {
    setCurrentChart('tvl');
  };
  const handleVolume = () => {
    setCurrentChart('volume');
  };
  const handleFee = () => {
    setCurrentChart('fee');
  };

  if (chartsData === []) {
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
          <span className={styles['values-text']}>${currentValue}</span>
          <span className={styles['values-date']}>Oct 24,2021</span>
        </div>
        <div className={styles.btns}>
          <div className={currentChart === 'tvl' ? styles['btn-active'] : styles.btn} onClick={handleTVL}>TVL</div>
          <div className={currentChart === 'volume' ? styles['btn-active'] : styles.btn} onClick={handleVolume}>Volume</div>
          <div className={currentChart === 'fee' ? styles['btn-active'] : styles.btn} onClick={handleFee}>Fee</div>
        </div>
      </div>
      <MemoCharts
        currentChart={currentChart}
        setCurrentValue={setCurrentValue}
        chartsData={chartsData}
      />
    </div>
  );
}

export default PoolMultiCharts;
