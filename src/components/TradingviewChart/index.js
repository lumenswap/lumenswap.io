import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { priceData } from './priceData';
// import { areaData } from './areaData';
import { volumeData } from './volumeData';
import styles from './styles.module.scss';

const TradingviewChart = () => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 370,
      layout: {
        backgroundColor: '#fff',
        textColor: '#8d8f9a',
      },
      grid: {
        vertLines: {
          color: '#fff',
        },
        horzLines: {
          color: '#fff',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: '#74a700',
      borderUpColor: '#74a700',
      wickUpColor: '#74a700',
      downColor: '#ea0070',
      borderDownColor: '#ea0070',
      wickDownColor: '#ea0070',
    });

    candleSeries.setData(priceData);

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    const volumeSeries = chart.current.addHistogramSeries({
      color: '#509',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.6,
        bottom: 0,
      },
    });

    volumeSeries.setData(volumeData.map((
      item,
    ) => ({ time: item.time, value: item.value, color: (item.value > 13047907) ? '#f5dce6' : '#e8eedc' })));
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <div ref={chartContainerRef} className={styles['chart-container']} />
    </div>
  );
};

export default TradingviewChart;
