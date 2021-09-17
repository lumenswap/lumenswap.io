import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
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

const LiquidityChart = () => {
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

    let timerID;
    document.body.onresize = () => {
      if (timerID) clearTimeout(timerID);
      timerID = setTimeout(() => {
        chart.resize(chartRef.current.clientWidth, chartRef.current.clientHeight);
      }, 200);
    };

    const areaSeries = chart.addAreaSeries({
      topColor: '#CFD9FF',
      bottomColor: '#fff',
      lineColor: '#0e41f5',
      lineWidth: 3,
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
      <div className={styles.data}>
        <div className={styles.price}>${info && info.price}</div>
        <div className={styles.date}>{info && info.date}</div>
      </div>
      <div ref={chartRef} className={styles.chart} />
    </div>
  );
};

export default LiquidityChart;
