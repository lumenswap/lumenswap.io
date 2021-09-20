import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

import ChartInfo from 'components/ChartInfo';
import { data } from './data';

import styles from './styles.module.scss';

const width = 600;
const height = 300;

const timeConverter = (timestamp) => {
  const a = new Date(timestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  return `${date} ${month} ${year}`;
};

const LiquidityChart = ({ style }) => {
  const [info, setInfo] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        horzLines: {
          color: '#eee',
          visible: false,
        },
        vertLines: {
          color: '#ffffff',
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: 'rgba(32, 38, 46, 0.1)',
          labelVisible: false,
        },
      },
      layout: {
        textColor: '#656872',
      },
    });

    chart.applyOptions({
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
      },
      priceScale: {
        autoScale: true,
      },
    });

    if (chartRef.current) {
      let timerID;
      document.body.onresize = () => {
        if (timerID) clearTimeout(timerID);
        timerID = setTimeout(() => {
          chart.resize(chartRef.current.clientWidth, chartRef.current.clientHeight);
        }, 200);
      };
    }

    const areaSeries = chart.addAreaSeries({
      topColor: '#CFD9FF',
      bottomColor: 'rgba(207, 217, 255, 0.15',
      lineColor: '#0e41f5',
      lineWidth: 3,
      scaleMargins: {
        top: 0,
        bottom: 0,
      },
    });
    areaSeries.setData(data);

    function setLastBarText() {
      setInfo({
        price: data[data.length - 1].value,
        date: timeConverter(data[data.length - 1].time),
      });
    }

    setLastBarText();

    chart.subscribeCrosshairMove((param) => {
      if (param === undefined || param.time === undefined || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
        setLastBarText();
      } else {
        const price = param.seriesPrices.get(areaSeries);
        setInfo({
          price: (Math.round(price * 100) / 100).toFixed(2),
          date: timeConverter(param.time),
        });
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      {info && <ChartInfo value={`$${info.price}`} time={info.date} />}
      <div ref={chartRef} className={styles.chart} style={style} />
    </div>
  );
};

export default LiquidityChart;
