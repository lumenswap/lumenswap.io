import { fetchTradeAggregationAPI } from 'api/stellar';
import BN from 'helpers/BN';
import moment from 'moment';

export const ST_TR_COUNT = 100;

export function mapStellarAggregationData(oldData, newData) {
  const candle = newData.reverse().map((item, index) => {
    let open;
    if (index === 0) {
      if (oldData[oldData.length - 1]) {
        open = oldData[oldData.length - 1].close;
      } else {
        open = item.open;
      }
    } else if (newData[index - 1]) {
      open = newData[index - 1].close;
    }

    return {
      time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
      open,
      close: item.close,
      high: item.high,
      low: item.low,
      avg: item.avg,
      base_volume: item.base_volume,
      counter_volume: item.counter_volume,
    };
  });

  const line = newData.map((item) => ({
    time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
    value: item.avg,
  }));

  const volume = newData.map((item) => ({
    time: moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD'),
    value: parseInt(item.base_volume, 10),
    color: new BN(item.open).isGreaterThan(item.close) ? '#f5dce6' : '#e8eedc',
  }));

  let innerOldCandle = [];
  const lastNewCandle = candle.slice(-1)[0];
  if (oldData.candle[0] && lastNewCandle) {
    innerOldCandle = [
      {
        ...oldData.candle[0],
        open: lastNewCandle.close,
      },
    ];
  } else if (oldData.candle[0]) {
    innerOldCandle = [oldData.candle[0]];
  }

  return {
    candle: [...candle, ...innerOldCandle, ...oldData.candle.slice(1)],
    volume: [...volume, ...oldData.volume],
    line: [...line, ...oldData.line],
    emptyNew: candle.length === 0,
  };
}

export function getTradeAggregation(baseAsset, counterAsset, startTime, endTime, oldData, limit) {
  return fetchTradeAggregationAPI(baseAsset, counterAsset, {
    start_time: startTime.valueOf(),
    end_time: endTime.valueOf(),
    resolution: 86400000,
    limit,
    offset: 0,
    order: 'desc',
  }).then((res) => mapStellarAggregationData(oldData, res.data._embedded.records));
}
