import TradingviewChart from 'containers/obm/spot/ChartSection/TradingviewChart';

const ChartSection = ({ candleSeriesData, lineSeriesData, volumeSeriesData }) => (
  <div>
    <TradingviewChart
      candleSeriesData={candleSeriesData}
      lineSeriesData={lineSeriesData}
      volumeSeriesData={volumeSeriesData}
    />
  </div>
);

export default ChartSection;
