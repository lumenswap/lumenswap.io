import { getSendEstimatedValueAPI } from 'api/stellar';
import BN from './BN';

export default function fetchMarketPrice(fromAsset, toAsset) {
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
    source_amount: new BN(1).div(10 * 4).toString(),
    ...fromPart,
    ...toPart,
  })
    .then((res) => new BN(res.destination_amount).times(10 * 4).toString())
    .catch((e) => {
      console.error(e);
      return 0;
    });
}
