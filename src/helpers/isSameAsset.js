export default function isSameAsset(first, second) {
  return first.getCode() === second.getCode()
  && first.getIssuer() === second.getIssuer()
  && first.getAssetType() === second.getAssetType();
}
