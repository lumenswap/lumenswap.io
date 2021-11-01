import StellarSDK from 'stellar-sdk';

export default function getAssetDetails(asset) {
  if (asset.type === 'liquidity_pool_shares') {
    return null;
  }

  if (asset.code !== 'XLM' && asset.type !== 'native' && asset.code && asset.issuer) {
    return new StellarSDK.Asset(asset.code, asset.issuer);
  }

  return new StellarSDK.Asset.native(); // eslint-disable-line
}
