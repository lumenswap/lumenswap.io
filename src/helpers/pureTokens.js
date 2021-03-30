import defaultTokens from 'tokens/defaultTokens';

export default function pureTokens(list, newAsset) {
  const foundInDefault = defaultTokens
    .find((token) => token.code === newAsset.code && token.issuer === newAsset.issuer);
  if (foundInDefault) {
    return false;
  }

  const foundInList = list
    .find((token) => token.code === newAsset.code && token.issuer === newAsset.issuer);
  if (foundInList) {
    return false;
  }

  return true;
}
