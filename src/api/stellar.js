import axios from 'axios';

export function getSendEstimatedValueAPI(params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/paths/strict-send`, { params }).then((res) => res.data._embedded.records[0]);
}

export function getReceiveEstimatedValueAPI(params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/paths/strict-receive`, { params }).then((res) => res.data._embedded.records[0]);
}

export function fetchAccountTokenList(address) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/accounts/${address}`)
    .then((res) => res.data.balances.map((item) => ({
      ...item,
      balance: item.balance,
    })));
}

export function fetchTradeAggregationAPI(baseAsset, counterAsset, params) {
  const assetParam = {};

  if (baseAsset.isNative()) {
    assetParam.base_asset_type = baseAsset.getAssetType();
  } else {
    assetParam.base_asset_type = baseAsset.getAssetType();
    assetParam.base_asset_code = baseAsset.getCode();
    assetParam.base_asset_issuer = baseAsset.getIssuer();
  }

  if (counterAsset.isNative()) {
    assetParam.counter_asset_type = counterAsset.getAssetType();
  } else {
    assetParam.counter_asset_type = counterAsset.getAssetType();
    assetParam.counter_asset_code = counterAsset.getCode();
    assetParam.counter_asset_issuer = counterAsset.getIssuer();
  }

  return axios.get(`${process.env.REACT_APP_HORIZON}/trade_aggregations`, { params: { ...assetParam, ...params } });
}

export function checkAssetAPI(assetCode, assetIssuer) {
  return global
    .fetch(
      `${process.env.REACT_APP_HORIZON}/assets?asset_code=${assetCode}&asset_issuer=${assetIssuer}`,
    )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return false;
    })
    .then((res) => {
      if (res === false) {
        return false;
      }

      if (res._embedded.records.length > 0) {
        return true;
      }

      return false;
    })
    .catch(() => false);
}
