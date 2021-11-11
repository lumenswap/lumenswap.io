import CChart from 'components/CChart';
import * as echarts from 'echarts';
import React, { useState } from 'react';

import moment from 'moment';
import { chartData } from 'api/chartsFakeData';
import styles from './styles.module.scss';

const { date, lineData, barData } = chartData;

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

const feeOptions = {
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
      name: 'fee',
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

const Chart = ({
  currentChart, setCurrentValue,
}) => {
  if (currentChart === 'tvl') {
    return <CChart height="125px" options={tvlOptions} />;
  }
  if (currentChart === 'fee') {
    return (
      <CChart
        onEvents={{
          mouseover: (params) => setCurrentValue(barData[params.dataIndex]),
          mouseout: () => setCurrentValue(326),
        }}
        options={feeOptions}
        height="125px"
      />
    );
  }
  if (currentChart === 'volume') {
    return (
      <CChart
        onEvents={{
          mouseover: (params) => setCurrentValue(barData[params.dataIndex]),
          mouseout: () => setCurrentValue(326),
        }}
        options={volumeOptions}
        height="125px"
      />
    );
  }
  return <></>;
};
const MemuCharts = React.memo(Chart);

function PoolMultiCharts() {
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
      <div className={styles['multi-chart-container']}>
        <MemuCharts currentChart={currentChart} setCurrentValue={setCurrentValue} />
      </div>
    </div>
  );
}

export default PoolMultiCharts;
