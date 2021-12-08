export default (data) => ({
  color: ['#74a700', '#ea0070'],

  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'cross',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: data?.xAxisSteps,
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Bids',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: data?.bids.concat(Array.from({ length: data?.asks.length }).fill(null)),
    },
    {
      name: 'Asks',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: Array.from({ length: data?.bids.length }).fill(null).concat(data?.asks),
    },
  ],
});
