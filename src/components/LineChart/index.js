// import Loading from 'components/Loading';
import ReactECharts from 'echarts-for-react';
// import { CHART_KEYS } from 'pages/Auction/aggregation';
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

const LineChart = ({ data, height }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => tooltipFormatter(params),
    },
    grid: {
      left: '20px',
      // top: '60px',
      right: '0',
      bottom: '0',
      containLabel: true,
      height: `${height}px`,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: textColor,
        fontSize: '14',
        fontFamily: '"SofiaPro", sans-serif',
        showMinLabel: false,
        showMaxLabel: false,
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
        show: true,
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
        showMinLabel: false,
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
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        // CHART_KEYS.map((i) => [i, 0])
        legendHoverLink: false,
        areaStyle: {
          color: '#0E41F3',
          opacity: 0.09,
          // shadowOffsetY: 3,
          // shadowOffsetX: 3,
        },
        lineStyle: {
          color: '#0e41f5',
        },
      },
    ],
    toolbox: {
      show: true,
    },
  };

  // if (!data) {
  //   return (
  //     <div
  //       className="col-xl-11 col-lg-10 col-md-10 col-sm-9 col-12 pr-sm-0 pr-3"
  //       style={{
  //         display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300,
  //       }}
  //     >
  //       <Loading size={50} />
  //     </div>
  //   );
  // }

  // option.series[0].data = CHART_KEYS.map((chartKey) => [chartKey, data[chartKey].toFixed(0)]);

  return (
    <div className="row">
      <div className="col-12">
        <div className={styles.echart}>
          <ReactECharts
            option={option}
            notMerge
            lazyUpdate
            style={{ height: `${height + 60}px` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
