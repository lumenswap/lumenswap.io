import { useEffect, useState } from 'react';
import moment from 'moment';

import ReactECharts from 'echarts-for-react';
import fakeDataChart from 'helpers/fakeDataChart';

import styles from './styles.module.scss';

const VolumeChart = () => {
  const { data, date } = fakeDataChart;
  const [label, setLabel] = useState({});

  useEffect(() => {
    setLabel({ value: data[data.length - 1], time: moment(date.length - 1).format('MMM Do YY') });
  }, []);

  const option = {
    color: ['#0e41f5'],
    grid: {
      width: '100%',
      height: 'auto',
      left: 0,
      bottom: 40,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      alwaysShowContent: true,
      showContent: true,
      position: [10, 0],
      formatter(params) {
        const param = params[0];
        const info = { value: param.value, time: moment(param.axisValue).format('MMM Do YY') };
        console.warn(info);
        return `<div><div class="chart-first-info">$${info.value}</div> <div class="chart-second-info">${info.time}</div></div>`;
      },
      className: 'echart-tooltip',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
      axisLabel: {
        formatter(value) {
          return moment(value).format('DD');
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#656872',
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    dataZoom: {
      start: 50,
      end: 54,
      type: 'inside',
    },
    series: {
      name: 'tvl',
      type: 'bar',
      itemStyle: {
        emphasis: {
          barBorderRadius: [50, 50],
        },
        normal: {
          barBorderRadius: [50, 50, 50, 50],
        },
      },
      data,
    },
  };

  return (
    <div className={styles.echart}>
      <div className={styles.default}>
        <div className="chart-first-info">${label.value}</div>
        <div className="chart-second-info">{label.time}</div>
      </div>
      <ReactECharts
        option={option}
        notMerge
        lazyUpdate
        theme="theme_name"
      />
    </div>
  );
};

export default VolumeChart;
