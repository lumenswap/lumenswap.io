import { fetchTradeAggregationAPI } from 'api/stellar';

function mapStellarAggregationData(data) {
  return data.reverse().map((item, index) => {
    {
      'a';
    }
    return {
      time: parseInt(item.timestamp, 10),
      open: item.open,
      close: item.close,
      high: item.high,
      low: item.low,
      avg: item.avg,
      volume: item.base_volume,
      counter_volume: item.counter_volume,
    };
  });
}

export function tvChartTrageAggregator(
  baseAsset,
  counterAsset,
  endTime,
  limit,
  resolution,
) {
  return fetchTradeAggregationAPI(baseAsset, counterAsset, {
    end_time: endTime,
    resolution,
    limit,
    offset: 0,
    order: 'desc',
  }).then((res) => mapStellarAggregationData(res.data._embedded.records));
}
