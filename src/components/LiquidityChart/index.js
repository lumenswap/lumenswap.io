import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import moment from 'moment';

import fakeDataChart from 'helpers/fakeDataChart';

import styles from './styles.module.scss';

const LiquidityChart = () => {
  const { data, date } = fakeDataChart;
  const [label, setLabel] = useState({});

  useEffect(() => {
    setLabel({ value: data[data.length - 1], time: moment(date.length - 1).format('MMM Do YY') });
  }, []);

  const option = {
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
      end: 57,
      type: 'inside',
    },
    series: [
      {
        name: 'Liquidity',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: '#0e41f5',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#0e41f5',
            },
            {
              offset: 1,
              color: 'rgb(14, 65, 245, 0.2)',
            },
          ]),
        },
        data,
      },
    ],
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
      />
    </div>
  );
};

export default LiquidityChart;
