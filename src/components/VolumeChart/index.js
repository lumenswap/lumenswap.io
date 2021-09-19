import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import ChartInfo from 'components/ChartInfo';
import { data } from './data';

import styles from './styles.module.scss';

const newData = data.map((i, index) => (
  { time: i.time, value: i.value, color: '#0e41f5' }
));

const VolumeChart = () => {
  const chartRef = useRef(null);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      rightPriceScale: {
        visible: false,
        borderVisible: false,
      },
      layout: {
        textColor: '#656872',
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
          visible: false,
        },
      },

      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
      },
      priceScale: {
        autoScale: true,
      },
    });

    chart.applyOptions({
      timeScale: {
        barSpacing: 4,
        borderVisible: false,
        secondsVisible: false,
        minBarSpacing: 1,
        tickMarkFormatter: (time, tickMarkType, locale) => time.day,
      },
    });

    let timerID;
    document.body.onresize = () => {
      if (timerID) clearTimeout(timerID);
      timerID = setTimeout(() => {
        chart.resize(chartRef.current.clientWidth, chartRef.current.clientHeight);
      }, 200);
    };

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0,
        bottom: 0,
      },
    });

    volumeSeries.setData(newData);

    function setLastBarText() {
      setInfo({ value: data[data.length - 1].value });
    }

    setLastBarText();

    chart.subscribeCrosshairMove((param) => {
      if (param === undefined || param.time === undefined || param.point.x < 0 || param.point.y < 0) {
        setLastBarText();
      } else {
        const value = param.seriesPrices.get(volumeSeries);
        setInfo({
          value: (Math.round(value * 100) / 100).toFixed(2),
        });
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <ChartInfo value={info.value} time="Volume 24h" />
      <div ref={chartRef} className={styles.chart} />
    </div>
  );
};

export default VolumeChart;
