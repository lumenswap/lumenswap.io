import Loading from 'components/Loading';
import CChart from 'components/CChart';
import * as echarts from 'echarts';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const ChartLoading = () => (
  <div className={styles['loading-container-chart']}>
    <Loading size={48} />
  </div>
);

const PageWrapper = ({ children, currentTVL }) => (
  <div className="col-md-6 col-12">
    <div className={styles['chart-container']}>
      <div className={styles['chart-info-container']}>
        <div className={styles['tvl-chart']}><span className={styles['volume-chart-number']}>${humanAmount(currentTVL.tvl, true)}</span>
          <span className={styles['tvl-chart-text']}>TVL</span>
        </div>
        <span className={styles['tvl-chart-time']}>{moment(currentTVL.periodTime).utc().format('MMM, DD')}</span>
      </div>
      {children}
    </div>
  </div>
);

const InnerChartMemo = React.memo(({ setCurrentTVL, tvlOptions, chartData }) => (
  <CChart
    onEvents={{
      highlight: (params) => setCurrentTVL(chartData[params.batch[0].dataIndex]),
      downplay: () => setCurrentTVL(chartData[chartData.length - 1]),
    }}
    options={tvlOptions}
    height="117px"
  />
));

function AMMOverallTVLChart({ chartData }) {
  const [currentTVL, setCurrentTVL] = useState({
    tvl: 0,
    volume: 0,
    periodTime: Date.now(),
  });

  const tvlOptions = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      alwaysShowContent: true,
      showContent: true,
      className: 'disabled-chart-tooltip',
      formatter() {
        return null;
      },
    },
    dataZoom: {
      start: 0,
      end: 100,
      type: 'inside',
    },
    xAxis: {
      data: chartData?.map((i) => i.periodTime),
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#656872',
        },
      },
      axisLabel: {
        formatter: (val) => moment(val).utc().format('DD'),
      },
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        name: 'TVL',
        type: 'line',
        showSymbol: false,
        data: chartData?.map((i) => i.tvl),
        lineStyle: { backgroundColor: '#0e41f5' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#aab6cc',
            },
            {
              offset: 1,
              color: '#e8f0fe',
            },
          ]),
        },
      },
    ],
  }), [chartData]);

  useEffect(() => {
    if (chartData !== null) {
      setCurrentTVL(chartData[chartData.length - 1]);
    }
  }, [chartData]);

  if (!chartData) {
    return (
      <PageWrapper currentTVL={currentTVL}>
        <ChartLoading />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper currentTVL={currentTVL}>
      <div className={styles.chart}>
        <InnerChartMemo
          tvlOptions={tvlOptions}
          setCurrentTVL={setCurrentTVL}
          chartData={chartData}
        />
      </div>
    </PageWrapper>
  );
}

export default React.memo(AMMOverallTVLChart);
