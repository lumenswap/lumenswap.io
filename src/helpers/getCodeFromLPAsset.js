import getAssetDetails from './getAssetDetails';

export default function getAssetFromLPAsset(asset) {
  const splitted = asset.split(':');
  return getAssetDetails({
    code: splitted[0],
    issuer: splitted[1],
  });
}
