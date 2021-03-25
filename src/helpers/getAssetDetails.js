import StellarSDK from 'stellar-sdk';

export default function getAssetDetails(asset) {
  let result;
  if (asset.code !== 'XLM' && asset.issuer !== 'native') {
    result = new StellarSDK.Asset(asset.code, asset.issuer);
  } else {
    result = new StellarSDK.Asset.native(); // eslint-disable-line
  }

  return result;
}
