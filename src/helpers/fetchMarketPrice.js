import StellarSDK from 'stellar-sdk';
import BN from './BN';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function fetchMarketPrice(fromAsset, toAsset) {
  try {
    if (fromAsset.isNative() && !toAsset.isNative()) {
      const result = await server.orderbook(fromAsset, toAsset).limit(1).call();
      if (result.bids.length > 0) {
        return new BN(result.bids[0].price).toString();
      }

      return null;
    } if (!fromAsset.isNative() && toAsset.isNative()) {
      const result = await server.orderbook(fromAsset, toAsset).limit(1).call();
      if (result.asks.length > 0) {
        return new BN(result.bids[0].price).toString();
      }

      return null;
    }

    const fromToNative = await server.orderbook(from, new StellarSDK.Asset.native()) // eslint-disable-line
      .limit(1)
      .call();
    if (fromToNative.bids.length === 0) {
      return null;
    }
    const fromCounterPrice = new BN(fromToNative.bids[0].price).toString();

    const nativeToTo = await server.orderbook(new StellarSDK.Asset.native(), to).limit(1).call(); // eslint-disable-line
    if (nativeToTo.asks.length === 0) {
      return null;
    }

    return new BN(nativeToTo.bids[0].price).times(fromCounterPrice).toString();
  } catch (e) {
    return null;
  }
}
