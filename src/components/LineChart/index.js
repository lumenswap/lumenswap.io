import Loading from 'components/Loading';
import ReactECharts from 'echarts-for-react';
import numeral from 'numeral';

import styles from './styles.module.scss';

const lineColor = '#e3e9ff';
const textColor = '#656872';

const convertor = (value) => numeral(value).format('0a');

const tooltipFormatter = (values) => `<div class="${styles.tooltip}">
    LSP-XLM <br/>
    BID PRICE: <span>${values[0].value[0]}</span> XLM <br/>
    VOLUME: <span>${numeral(values[0].value[1]).format('0,0')}</span> LSP
  </div>`;

const LineChart = ({ data }) => {
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
      type: 'category',
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
      // interval: 10000000,
      min: 0,
      // max: 9000,
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
        data: CHART_KEYS.map((i) => [i, 0]),
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

  if (!data) {
    return (
      <div
        className="col-xl-11 col-lg-10 col-md-10 col-sm-9 col-12 pr-sm-0 pr-3"
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300,
        }}
      >
        <Loading size={50} />
      </div>
    );
  }

  option.series[0].data = CHART_KEYS.map((chartKey) => [chartKey, data[chartKey].toFixed(0)]);

  return (
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
};

export default LineChart;
