import React, { useEffect, useMemo } from 'react';
import moment from 'moment';
import CChart from 'components/CChart';

import styles from './styles.module.scss';

const Chart = ({ option, setStatsVolumeInfo, data }) => (
  <CChart
    options={option}
    height={185}
    onEvents={{
      highlight: (params) => setStatsVolumeInfo({
        currentTime: data[params.batch[0].dataIndex].periodTime,
        currentVolume: data[params.batch[0].dataIndex].tradeAmount,
      }),
      downplay: () => setStatsVolumeInfo({
        currentTime: data[data.length - 1].periodTime,
        currentVolume: data[data.length - 1].tradeAmount,
      }),
    }}
  />
);

const MemoChart = React.memo(Chart);

const NftStatsChart = ({ setStatsVolumeInfo, data }) => {
  useEffect(() => {
    setStatsVolumeInfo({
      currentTime: data[data.length - 1].periodTime,
      currentVolume: data[data.length - 1].tradeAmount,
    });
  }, []);

  const option = useMemo(() => (
    {
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
          color: '#656872',
          fontWeight: 500,
          fontSize: 16,
        },
        data: data?.map((i) => i.periodTime),
        splitLine: {
          show: false,
        },
      },
      yAxis: { show: false, splitLine: { show: false } },
      series: [
        {
          name: 'volume',
          type: 'bar',
          barWidth: Math.max(2, 20 / Math.round(Math.sqrt(data?.length))),
          barGap: '100%',
          data: data?.map((i) => i.tradeAmount),
          itemStyle: {
            color: '#0e41f5', borderColor: '#fff', borderWidth: 0, borderRadius: [5, 5, 0, 0],
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
    }
  ), [data]);

  return (
    <div className={styles.echart}>
      <div className={styles.chart}>
        <MemoChart data={data} setStatsVolumeInfo={setStatsVolumeInfo} option={option} />
      </div>
    </div>
  );
};

export default React.memo(NftStatsChart);
