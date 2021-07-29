import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import USDC from 'tokens/USDC';
import XLM from 'tokens/XLM';

export default function createPairForDefaultTokens() {
  const result = [];

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(USDC), getAssetDetails(token))) {
      result.push({
        base: getAssetDetails(token),
        counter: getAssetDetails(USDC),
      });
    }
  }

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(XLM), getAssetDetails(token))) {
      result.push({
        base: getAssetDetails(token),
        counter: getAssetDetails(XLM),
      });
    }
  }

  return result;
}
