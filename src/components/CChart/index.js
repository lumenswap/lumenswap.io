import EChartsReact from 'echarts-for-react';
import React from 'react';

function CChart({ height, options, onEvents }) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    ...options,
    height,
    grid: {
      x: 0,
      y: 0,
      x2: 0,
      y2: 0,
      width: '100%',
    },
  };

  return (
    <EChartsReact
      onEvents={onEvents}
      notMerge
      lazyUpdate
      option={chartOptions}
    />
  );
}

export default React.memo(CChart);
