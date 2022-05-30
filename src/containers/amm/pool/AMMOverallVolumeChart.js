import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import CChart from 'components/CChart';
import Loading from 'components/Loading';
import humanizeAmount from 'helpers/humanizeAmount';
import BN from 'helpers/BN';
import classNames from 'classnames';
import styles from './styles.module.scss';

const ChartLoading = () => (
  <div className={styles['loading-container-chart']}>
    <Loading size={48} />
  </div>
);

const PageWrapper = ({ children, currentVolume }) => (
  <div className={classNames('col-md-6 col-12 pl-0', styles['chart-main-container-right'])}>
    <div className={styles['chart-container']}>
      <div className={styles['chart-info-container']}>
        <div className={styles['volume-chart']}>
          <div className={styles['volume-chart-info']}>
            <span className={styles['volume-chart-number']}>${humanizeAmount(new BN(currentVolume.volume).div(10 ** 7).toString(), true)}</span>
            <span className={styles['volume-chart-text']}>Volume 24h</span>
          </div>
          <span className={styles['volume-chart-time']}>{moment(currentVolume.periodTime).utc().format('MMM, DD')}</span>
        </div>
      </div>
      {children}
    </div>
  </div>
);

function VolumeChart({ options, setCurrentVolume, chartData }) {
  return (
    <CChart
      options={options}
      onEvents={{
        highlight: (params) => setCurrentVolume(chartData[params.batch[0].dataIndex]),
        downplay: () => setCurrentVolume(chartData[chartData.length - 1]),
      }}
      height="137px"
      gridOptions={{ top: 3 }}
    />
  );
}

const InnerChartMemo = React.memo(VolumeChart);

function AMMOVerallVolumeChart({ chartData, currentTheme }) {
  const [currentVolume, setCurrentVolume] = useState({
    tvl: 0,
    volume: 0,
  });

  const volumeOptions = useMemo(() => ({
    // tooltip: {},
    dataZoom: {
      start: 0,
      end: 100,
      type: 'inside',
    },
    tooltip: {
      trigger: 'axis',
      alwaysShowContent: true,
      showContent: true,
      className: 'disabled-chart-tooltip',
      axisPointer: {
        type: 'shadow',
      },
      formatter() {
        return null;
      },
    },
    xAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: '#656872',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (val) => moment(val).utc().format('DD'),
      },
      data: chartData?.map((i) => i.periodTime),
      splitLine: {
        show: false,
      },
    },
    yAxis: { show: false, splitLine: { show: false } },
    series: [
      {
        name: 'volume',
        type: 'bar',
        barWidth: Math.max(2, 20 / Math.round(Math.sqrt(chartData?.length))),
        barGap: '100%',
        data: chartData?.map((i) => i.volume),
        itemStyle: {
          color: `${currentTheme === 'light' ? '#0e41f5' : '#3a66ff'}`, borderColor: '#fff', borderWidth: 0, borderRadius: [5, 5, 0, 0],
        },
        emphasis: {
          focus: 'series',
        },
        animationDelay(idx) {
          return idx * 10;
        },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate(idx) {
      return idx * 5;
    },
  }), [chartData, currentTheme]);

  useEffect(() => {
    if (chartData !== null) {
      setCurrentVolume(chartData[chartData.length - 1]);
    }
  }, [chartData]);

  if (!chartData) {
    return (
      <PageWrapper currentVolume={currentVolume}>
        <ChartLoading />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper currentVolume={currentVolume}>
      <div className={styles.chart}>
        <InnerChartMemo
          options={volumeOptions}
          setCurrentVolume={setCurrentVolume}
          chartData={chartData}
        />
      </div>
    </PageWrapper>
  );
}

export default React.memo(AMMOVerallVolumeChart);
