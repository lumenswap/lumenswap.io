import { getSendEstimatedValueAPI } from 'api/stellar';

export default function calculateEstimatedAndPath(amount, fromAsset, toAsset) {
  let fromPart = {};
  if (fromAsset.getAssetType() === 'native') {
    fromPart = {
      source_asset_type: 'native',
    };
  } else {
    fromPart = {
      source_asset_type: fromAsset.getAssetType(),
      source_asset_code: fromAsset.getCode(),
      source_asset_issuer: fromAsset.getIssuer(),
    };
  }

  let toPart = {};
  if (toAsset.getAssetType() === 'native') {
    toPart = {
      destination_assets: 'native',
    };
  } else {
    toPart = {
      destination_assets: `${toAsset.getCode()}:${toAsset.getIssuer()}`,
    };
  }

  return getSendEstimatedValueAPI({
    source_amount: amount,
    ...fromPart,
    ...toPart,
  }).then((res) => ({
    minAmount: res.destination_amount,
    path: res.path,
  })).catch((e) => {
    console.log(e);
    return {
      minAmount: 0,
      path: [],
    };
  });
}
