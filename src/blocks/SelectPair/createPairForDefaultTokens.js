import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import XLM from 'tokens/XLM';

export default function createPairForDefaultTokens() {
  const result = [];

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(XLM), getAssetDetails(token))) {
      result.push({
        base: getAssetDetails(XLM),
        counter: getAssetDetails(token),
      });
    }
  }

  return result;
}
