import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { data } from './data';

import styles from './styles.module.scss';

const width = 600;
const height = 300;

const LiquidityChart = () => {
  const [info, setInfo] = useState({});
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      rightPriceScale: {
        scaleMargins: {
          top: 0.35,
          bottom: 0.2,
        },
        borderVisible: false,
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
    });
    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(19, 68, 193, 0.4)',
      bottomColor: 'rgba(0, 120, 255, 0.0)',
      lineColor: 'rgba(19, 40, 153, 1.0)',
      lineWidth: 3,
    });
    areaSeries.setData(data);

    function setLastBarText() {
      const dateStr = `${data[data.length - 1].time.year} - ${data[data.length - 1].time.month} - ${data[data.length - 1].time.day}`;
      setInfo({ price: data[data.length - 1].value, date: dateStr });
    }

    setLastBarText();

    chart.subscribeCrosshairMove((param) => {
      if (param === undefined || param.time === undefined || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
        setLastBarText();
      } else {
        const dateStr = `${param.time.year} - ${param.time.month} - ${param.time.day}`;
        const price = param.seriesPrices.get(areaSeries);
        setInfo({ price: (Math.round(price * 100) / 100).toFixed(2), date: dateStr });
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <div>{info && info.price}</div>
        <div>{info && info.date}</div>
      </div>
      <div ref={chartRef} className="h-100 w-100" />
    </div>
  );
};

export default LiquidityChart;
