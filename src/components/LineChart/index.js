import ReactECharts from 'echarts-for-react';

import styles from './styles.module.scss';

const lineColor = '#e3e9ff';
const textColor = '#656872';

const convertor = (value) => `${value / 1000}k`;

const tooltipFormatter = (values) => `<div class="${styles.tooltip}">
    LSP-XLM <br/>
    BID PRICE: <span>${values[0].value[0]}</span> XLM <br/>
    VOLUME: <span>${values[0].value[1]}</span> LSP
  </div>`;

const option = {
  tooltip: {
    trigger: 'axis',
    formatter: (params) => tooltipFormatter(params),
  },
  grid: {
    left: '20px',
    right: '87px',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    name: 'Price(XLM)',
    nameTextStyle: {
      color: '#1d1d1d',
      fontSize: '14',
      fontFamily: '"SofiaPro", sans-serif',
    },
    axisLabel: {
      color: textColor,
      fontSize: '14',
      fontFamily: '"SofiaPro", sans-serif',
    },
    axisLine: {
      lineStyle: {
        color: lineColor,
      },
    },
    axisTick: {
      lineStyle: {
        color: lineColor,
      },
    },
    splitLine: {
      lineStyle: {
        color: lineColor,
      },
    },
  },
  yAxis: {
    type: 'value',
    name: 'Amount(LSP)',
    interval: 1000,
    min: 1000,
    max: 9000,
    nameTextStyle: {
      color: '#1d1d1d',
      fontSize: '14',
      fontFamily: '"SofiaPro", sans-serif',
      padding: [0, 0, 10, 0],
    },
    axisLabel: {
      color: textColor,
      fontSize: '14',
      fontFamily: '"SofiaPro", sans-serif',
      formatter: (value) => convertor(value),
    },
    axisLine: {
      lineStyle: {
        color: lineColor,
      },
    },
    splitLine: {
      lineStyle: {
        color: lineColor,
      },
    },
  },
  series: [
    {
      name: 'Step LSP',
      type: 'line',
      step: 'start',
      symbol: 'none',
      data: [
        [0.0, 8000], [0.01, 7000], [0.02, 6000], [0.03, 5000],
        [0.04, 4000], [0.05, 3000], [0.06, 2000], [0.07, 1000],
        [0.07, 500],
      ],
      legendHoverLink: false,
      areaStyle: {
        color: '#0E41F3',
        opacity: 0.09,
      },
      lineStyle: {
        color: '#0e41f5',
      },
    },
  ],
};

const LineChart = () => (
  <div className="row">
    <div className="col-12">
      <div className={styles.echart}>
        <ReactECharts
          option={option}
          notMerge
          lazyUpdate
        />
      </div>
    </div>
  </div>
);

export default LineChart;
