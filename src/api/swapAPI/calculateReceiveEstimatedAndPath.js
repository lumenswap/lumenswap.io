import { getReceiveEstimatedValueAPI } from 'api/stellar';

export default function calculateReceiveAndPath(amount, fromAsset, toAsset) {
  let fromPart = {};
  if (fromAsset.getAssetType() === 'native') {
    fromPart = {
      source_assets: 'native',
    };
  } else {
    fromPart = {
      source_assets: `${fromAsset.getCode()}:${fromAsset.getIssuer()}`,
    };
  }

  let toPart = {};
  if (toAsset.getAssetType() === 'native') {
    toPart = {
      destination_asset_type: 'native',
    };
  } else {
    toPart = {
      destination_asset_type: toAsset.getAssetType(),
      destination_asset_code: toAsset.getCode(),
      destination_asset_issuer: toAsset.getIssuer(),
    };
  }

  return getReceiveEstimatedValueAPI({
    destination_amount: amount,
    ...fromPart,
    ...toPart,
  }).then((res) => ({
    minAmount: res.source_amount,
    path: res.path,
  })).catch((e) => {
    console.log(e);
    return {
      minAmount: 0,
      path: [],
    };
  });
}
