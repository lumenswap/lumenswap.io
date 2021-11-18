// import Loading from 'components/Loading';
import ReactECharts from 'echarts-for-react';
<<<<<<< HEAD
=======
// import { CHART_KEYS } from 'pages/Auction/aggregation';
>>>>>>> 91e751fe72946674fea94882f189c0ca1a3e0d20
import numeral from 'numeral';

import { useEffect, useState } from 'react';
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
  const [isFullScreen, setFullScreen] = useState(false);

  const initialSize = { CHeight: `${height + 60}px`, CWidth: 'auto' };
  const [size, setSize] = useState(initialSize);

  const fullScreenView = {
    myTool: {
      show: true,
      title: 'Fullscreen',
      iconStyle: {
        color: '#0e41f5',
        borderColor: '#0e41f5',
        borderWidth: 0,
      },
      icon: 'M.73 0a.726.726 0 0 0-.72.827v3.539a.726.726 0 1 0 1.453 0V2.487L4.58 5.605a.726.726 0 1 0 1.027-1.027L2.49 1.46h1.878a.726.726 0 1 0 0-1.453H.822A.726.726 0 0 0 .729 0zm14.52 0a.726.726 0 0 0-.082.007h-3.536a.726.726 0 1 0 0 1.453h1.878l-3.118 3.118a.726.726 0 1 0 1.027 1.027l3.118-3.118v1.879a.726.726 0 1 0 1.453 0V.826A.726.726 0 0 0 15.25 0zM5.08 10.17a.726.726 0 0 0-.499.22l-3.118 3.117V11.63a.726.726 0 1 0-1.453 0v3.521a.726.726 0 0 0 .837.837h3.521a.726.726 0 1 0 0-1.453H2.49l3.118-3.118a.726.726 0 0 0-.528-1.247zm5.818 0a.726.726 0 0 0-.506 1.246l3.118 3.118h-1.878a.726.726 0 1 0 0 1.453h3.52a.726.726 0 0 0 .838-.837v-3.52a.726.726 0 1 0-1.453 0v1.877L11.42 10.39a.726.726 0 0 0-.52-.22z',
      onclick() {
        setFullScreen(true);
      },
    },
  };
  const [tool, setTool] = useState(fullScreenView);

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
      min: 0,
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
        },
        lineStyle: {
          color: '#0e41f5',
        },
      },
    ],
    toolbox: {
      show: true,
      itemSize: 16,
      showTitle: false,
      right: 10,
      top: 15,
      feature: { ...tool },
    },
  };

  useEffect(() => {
    if (isFullScreen) {
      setSize({ CHeight: '100%', CWidth: '100%' });
      setTool({
        myTool: {
          show: true,
          title: 'Exit fullscreen',
          iconStyle: {
            color: '#0e41f5',
            borderColor: '#0e41f5',
            borderWidth: 0,
          },
          icon: 'm8.874 7.5 5.84-5.84A.97.97 0 1 0 13.342.284L7.5 6.125 1.66.286A.97.97 0 1 0 .284 1.659L6.125 7.5l-5.84 5.841a.97.97 0 1 0 1.374 1.374l5.84-5.84 5.842 5.84a.97.97 0 0 0 1.374 0 .97.97 0 0 0 0-1.374l-5.84-5.84z',
          onclick() {
            setFullScreen(false);
          },
        },
      });
    } else {
      setSize(initialSize);
      setTool(fullScreenView);
    }
  }, [isFullScreen]);

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
        {
          isFullScreen ? (
            <div
              className={styles.fullScreenMask}
              style={{ height: size.CHeight, width: size.CWidth }}
            >
              <ReactECharts
                option={option}
                notMerge
                lazyUpdate
                style={{ height: size.CHeight, width: size.CWidth }}
              />
            </div>
          ) : (
            <ReactECharts
              option={option}
              notMerge
              lazyUpdate
              style={{ height: size.CHeight, width: size.CWidth }}
            />
          )
        }
      </div>
    </div>
  );
};

export default LineChart;
