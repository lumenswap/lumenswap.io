import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import styles from './styles.module.scss';

const TradingviewChart = ({ candleSeriesData, lineSeriesData, volumeSeriesData }) => {
  const chartContainerRef = useRef();
  const oneTimeRef = useRef(false);
  const chart = useRef();
  const resizeObserver = useRef();
  const sampleLabel = 'ETC USD 7D VWAP:';
  const [legend, setLegend] = useState(sampleLabel);

  useEffect(() => {
    if (!!candleSeriesData && !!lineSeriesData && !!volumeSeriesData && !oneTimeRef.current) {
      oneTimeRef.current = true;

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
      candleSeries.setData(candleSeriesData);

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
      volumeSeries.setData(volumeSeriesData);

      // line series
      const lineSeries = chart.current.addLineSeries({
        color: '#E45BEF',
        lineWidth: 1,
      });
      lineSeries.setData(lineSeriesData);

      // legend
      chart.current.subscribeCrosshairMove((param) => {
        if (param.time) {
          const currentData = param.seriesPrices.get(candleSeries);
          setLegend(
            <>
              ${sampleLabel}
              <span className={styles.value}>
                H:{currentData.high} L:{currentData.low} O:{currentData.open} C:{currentData.close}
              </span>
            </>,
          );
        } else {
          setLegend(sampleLabel);
        }
      });
    }
  }, [candleSeriesData, lineSeriesData, volumeSeriesData]);

  // Resize chart on container resizes.
  useEffect(() => {
    if (chart.current) {
      resizeObserver.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        chart.current.applyOptions({ width, height });
        setTimeout(() => {
          chart.current.timeScale().fitContent();
        }, 0);
      });

      resizeObserver.current.observe(chartContainerRef.current);
    }

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
