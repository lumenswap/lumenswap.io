import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createChart, CrosshairMode } from 'lightweight-charts';
import numeral from 'numeral';
import moment from 'moment';
import styles from './styles.module.scss';
import { getTradeAggregation, ST_TR_COUNT } from './utils';

function onVisibleLogicalRangeChange(
  setTimoutTimer,
  timeScale,
  candleSeriesRef,
  getAggWrapper,
) {
  return () => {
    if (setTimoutTimer.current !== null) {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    setTimoutTimer.current = setTimeout(() => {
      const logicalRange = timeScale.getVisibleLogicalRange();
      if (logicalRange !== null) {
        const barsInfo = candleSeriesRef.current.barsInLogicalRange(logicalRange);
        if (barsInfo !== null && barsInfo.barsBefore < 10) {
          getAggWrapper();
        }
      }
      // eslint-disable-next-line no-param-reassign
      setTimoutTimer.current = null;
    }, 50);
  };
}

function humany(number) {
  return numeral(number).format('0.0[00]a');
}

const fetchingIntervalValues = {
  day: {
    resolution: 86400000,
    per: 'days',
    key: '1day',
  },
  week: {
    resolution: 604800000,
    per: 'days',
    key: '1week',
  },
};

const TradingviewChart = ({
  appSpotPair,
}) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const sampleLabel = '';
  // eslint-disable-next-line
  const [legend, setLegend] = useState(sampleLabel);
  const setTimoutTimer = useRef(null);
  const candleSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  // const lineSeriesRef = useRef(null);
  const previousFuncRef = useRef(null);
  const lastFetchedTimeRef = useRef(null);
  const [fetchingInterval, setFetchingInterval] = useState(fetchingIntervalValues.day);
  const [chartData, setChartData] = useState(null);
  const [isLoadingPrevented, setPreventLoading] = useState(false);

  function getAggWrapper(clearMode = false) {
    let startTime;
    let endTime;
    if (lastFetchedTimeRef.current === null) {
      const currentTime = Date.now();
      startTime = moment(currentTime)
        .startOf('second')
        .subtract(ST_TR_COUNT, fetchingInterval.per);
      endTime = moment(currentTime)
        .startOf('second')
        .add(1, fetchingInterval.per);
    } else {
      startTime = moment(lastFetchedTimeRef.current)
        .subtract(ST_TR_COUNT + 1, fetchingInterval.per);
      endTime = moment(lastFetchedTimeRef.current)
        .subtract(1, fetchingInterval.per);
    }

    let innerChartData;
    if (clearMode) {
      innerChartData = { candle: [], volume: [], line: [] };
    } else if (!chartData) {
      innerChartData = { candle: [], volume: [], line: [] };
    } else {
      innerChartData = chartData;
    }

    return getTradeAggregation(
      appSpotPair.base,
      appSpotPair.counter,
      startTime,
      endTime,
      innerChartData,
      ST_TR_COUNT + 10,
      fetchingInterval.resolution,
    )
      .then((res) => {
        if (res.emptyNew) {
          setPreventLoading(true);
        } else {
          setChartData(res);

          lastFetchedTimeRef.current = startTime.valueOf();
        }
      }).catch(console.error);
  }

  useEffect(() => {
    if (lastFetchedTimeRef.current) {
      lastFetchedTimeRef.current = null;
      setPreventLoading(false);
      setChartData({ candle: [], volume: [], line: [] });

      getAggWrapper(true);
    }
  }, [appSpotPair.base, appSpotPair.counter]);

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

    // candle series
    candleSeriesRef.current = chart.current.addCandlestickSeries({
      upColor: '#74a700',
      borderUpColor: '#74a700',
      wickUpColor: '#74a700',
      downColor: '#ea0070',
      borderDownColor: '#ea0070',
      wickDownColor: '#ea0070',
      baseLineWidth: 2,
    });

    // // volume series
    volumeSeriesRef.current = chart.current.addHistogramSeries({
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

    // // line series
    // lineSeriesRef.current = chart.current.addLineSeries({
    //   color: '#E45BEF',
    //   lineWidth: 1,
    // });
    // lineSeries.setData(lineSeriesData);

    // // legend
    chart.current.subscribeCrosshairMove((param) => {
      if (param.time) {
        const currentData = param.seriesPrices.get(candleSeriesRef.current);
        setLegend(
          <>
            {sampleLabel}
            <span className={styles.value}>
              H: {humany(currentData?.high)}{'   '}L: {humany(currentData?.low)}{'   '}
              O: {humany(currentData?.open)}{'   '}C: {humany(currentData?.close)}
            </span>
          </>,
        );
      } else {
        setLegend(sampleLabel);
      }
    });

    getAggWrapper();
  }, []);

  useEffect(() => {
    const timeScale = chart.current.timeScale();

    timeScale.unsubscribeVisibleLogicalRangeChange(previousFuncRef.current);

    if (!isLoadingPrevented) {
      previousFuncRef.current = onVisibleLogicalRangeChange(
        setTimoutTimer,
        timeScale,
        candleSeriesRef,
        getAggWrapper,
      );
      timeScale.subscribeVisibleLogicalRangeChange(previousFuncRef.current);
    }
  }, [chartData, isLoadingPrevented]);

  useEffect(() => {
    if (chart.current && !!chartData) {
      candleSeriesRef.current.setData(chartData.candle);
      volumeSeriesRef.current.setData(chartData.volume);
      // lineSeriesRef.current.setData(chartData.line);
    }
  }, [chartData]);

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

  useEffect(() => {
    if (lastFetchedTimeRef.current) {
      lastFetchedTimeRef.current = null;
      setPreventLoading(false);
      setChartData({ candle: [], volume: [], line: [] });

      getAggWrapper(true);
    }
  }, [fetchingInterval]);

  const timeFilter = [
    { label: '1 Day', value: '1day', duration: 'day' },
    { label: '1 Week', value: '1week', duration: 'week' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.legend}>{legend}</div>
      <div className={styles['box-time']}>
        {timeFilter.map((time, index) => (
          <span
            key={index}
            className={classNames(styles.Rectangle,
              (fetchingInterval.key === time.value) && styles.active)}
            onClick={() => {
              if (fetchingInterval.key !== time.value) {
                setFetchingInterval(fetchingIntervalValues[`${time.duration}`]);
              }
            }}
          >
            {time.label}
          </span>
        ))}
      </div>
      <div ref={chartContainerRef} className={styles['chart-container']} />
    </div>
  );
};

export default TradingviewChart;
