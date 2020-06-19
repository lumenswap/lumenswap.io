import StellarSDK from 'stellar-sdk';
import getAssetDetails from './getAssetDetails';

const server = new StellarSDK.Server(process.env.HORIZON);

export default async function fetchCounterPrice(fromAsset, toAsset) {
  try {
    const from = getAssetDetails(fromAsset);
    const to = getAssetDetails(toAsset);

    if (from.isNative() && !to.isNative()) {
      const result = await server.orderbook(from, to).limit(1).call();
      if (result.bids.length > 0) {
        return parseFloat(result.bids[0].price);
      }

      return null;
    } if (!from.isNative() && to.isNative()) {
      const result = await server.orderbook(from, to).limit(1).call();
      if (result.asks.length > 0) {
        return parseFloat(result.bids[0].price);
      }

      return null;
    }

    const fromToNative = await server.orderbook(from, new StellarSDK.Asset.native()) // eslint-disable-line
      .limit(1)
      .call();
    if (fromToNative.bids.length === 0) {
      return null;
    }
    const fromCounterPrice = parseFloat(fromToNative.bids[0].price);

    const nativeToTo = await server.orderbook(new StellarSDK.Asset.native(), to).limit(1).call(); // eslint-disable-line
    if (nativeToTo.asks.length === 0) {
      return null;
    }

    return parseFloat(nativeToTo.bids[0].price) * fromCounterPrice;
  } catch (e) {
    return null;
  }
}
