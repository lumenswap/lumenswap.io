import { fetchTradeAggregationAPI } from 'api/stellar';

function mapStellarAggregationData(data) {
  return data.map((item, index) => {
    let open;
    if (data[index + 1]) {
      open = data[index + 1].close;
    } else {
      open = item.open;
    }

    return {
      time: parseInt(item.timestamp, 10),
      open: parseFloat(open),
      close: parseFloat(item.close),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      avg: parseFloat(item.avg),
      volume: parseInt(item.base_volume, 10),
      counter_volume: item.counter_volume,
    };
  }).reverse();
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
