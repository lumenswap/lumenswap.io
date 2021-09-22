import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Loading from 'components/Loading';
import { fetchOrderBookAPI } from 'api/stellar';
import aggregateData from './aggregateData';
import generateOptions from './generateOptions';
import styles from './styles.module.scss';

const DepthChart = ({ appSpotPair }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    fetchOrderBookAPI(appSpotPair.base, appSpotPair.counter, { limit: 25 }).then((res) => {
      setData(aggregateData(res));
    });
  }, [appSpotPair]);

  const option = generateOptions(data);

  if (data === null) {
    return (
      <div style={{ height: 416 }} className="d-flex align-items-center justify-content-center p-5">
        <Loading size={50} />
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <ReactECharts className={styles.chart} option={option} lazyUpdate />
    </div>
  );
};

export default DepthChart;
