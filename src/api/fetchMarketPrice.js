// import { getSendEstimatedValueAPI } from 'api/stellar';
import StellarSDK from 'stellar-sdk';
import BN from '../helpers/BN';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function fetchMarketPrice(fromAsset, toAsset) {
  try {
    if (fromAsset.isNative() && !toAsset.isNative()) {
      const result = await server.orderbook(fromAsset, toAsset).limit(1).call();
      if (result.bids.length > 0) {
        return new BN(result.bids[0].price);
      }

      return 0;
    } if (!fromAsset.isNative() && toAsset.isNative()) {
      const result = await server.orderbook(fromAsset, toAsset).limit(1).call();
      if (result.asks.length > 0) {
        return new BN(result.bids[0].price);
      }

      return 0;
    }

    const fromToNative = await server.orderbook(fromAsset, new StellarSDK.Asset.native()) // eslint-disable-line
      .limit(1)
      .call();
    if (fromToNative.bids.length === 0) {
      return 0;
    }
    const fromCounterPrice = new BN(fromToNative.bids[0].price);

    const nativeToTo = await server.orderbook(new StellarSDK.Asset.native(), toAsset).limit(1).call(); // eslint-disable-line
    if (nativeToTo.asks.length === 0) {
      return 0;
    }

    return new BN(nativeToTo.bids[0].price).times(fromCounterPrice);
  } catch (e) {
    return 0;
  }
}

// export default function fetchMarketPrice(fromAsset, toAsset) {
//   let fromPart = {};
//   if (fromAsset.getAssetType() === 'native') {
//     fromPart = {
//       source_asset_type: 'native',
//     };
//   } else {
//     fromPart = {
//       source_asset_type: fromAsset.getAssetType(),
//       source_asset_code: fromAsset.getCode(),
//       source_asset_issuer: fromAsset.getIssuer(),
//     };
//   }

//   let toPart = {};
//   if (toAsset.getAssetType() === 'native') {
//     toPart = {
//       destination_assets: 'native',
//     };
//   } else {
//     toPart = {
//       destination_assets: `${toAsset.getCode()}:${toAsset.getIssuer()}`,
//     };
//   }

//   return getSendEstimatedValueAPI({
//     source_amount: new BN(1).div(10 ** 4).toString(),
//     ...fromPart,
//     ...toPart,
//   })
//     .then((res) => new BN(res.destination_amount).times(10 ** 4).toString())
//     .catch((e) => {
//       console.error(e);
//       return 0;
//     });
// }
