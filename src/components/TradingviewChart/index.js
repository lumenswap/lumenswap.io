import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { priceData } from './priceData';
import { volumeData } from './volumeData';
import styles from './styles.module.scss';

const TradingviewChart = () => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const sampleLabel = 'ETC USD 7D VWAP:';
  const [legend, setLegend] = useState(sampleLabel);

  const calculateSMA = (data, count) => {
    // eslint-disable-next-line
    const avg = (data) => {
      let sum = 0;
      // eslint-disable-next-line
      for (let i = 0; i < data.length; i++) {
        sum = sum + data[i].close;
      }
      return sum / data.length;
    };
    const result = [];
    // eslint-disable-next-line
    for (let i = count - 1, len = data.length; i < len; i++) {
      const val = avg(data.slice(i - count + 1, i));
      // console.warn(val);
      result.push({ time: data[i].time, value: val });
    }
    return result;
  };

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 414,
      layout: {
        backgroundColor: '#fff',
        textColor: '#8d8f9a',
      },
      grid: {
        vertLines: {
          color: '#fff',
          visible: false,
        },
        horzLines: {
          color: '#fff',
          visible: false,
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
    // console.log(chart.current);

    // candle series
    const candleSeries = chart.current.addCandlestickSeries({
      upColor: '#74a700',
      borderUpColor: '#74a700',
      wickUpColor: '#74a700',
      downColor: '#ea0070',
      borderDownColor: '#ea0070',
      wickDownColor: '#ea0070',
    });
    candleSeries.setData(priceData);

    // volume series
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

    // line series
    const lineSeries = chart.current.addLineSeries({
      color: '#E45BEF',
      lineWidth: 1,
    });
    lineSeries.setData(calculateSMA(priceData, 10));

    // legend
    chart.current.subscribeCrosshairMove((param) => {
      if (param.time) {
        const price = param.seriesPrices.get(volumeSeries);
        setLegend(<>${sampleLabel} <span className={styles.value}>${price.toFixed(2)}</span></>);
      } else {
        setLegend(sampleLabel);
      }
    });
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
      <div className={styles.legend}>{legend}</div>
      <div ref={chartContainerRef} className={styles['chart-container']} />
    </div>
  );
};

export default TradingviewChart;
