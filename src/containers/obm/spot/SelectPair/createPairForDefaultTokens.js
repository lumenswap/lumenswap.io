import { getAssetDetails, isSameAsset } from 'helpers/asset';
import defaultTokens from 'tokens/defaultTokens';
import LSP from 'tokens/LSP';
import NLSP from 'tokens/NLSP';
import USDC from 'tokens/USDC';
import XLM from 'tokens/XLM';

export default function createPairForDefaultTokens() {
  const result = [];

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(USDC), getAssetDetails(token))
    && !isSameAsset(getAssetDetails(NLSP), getAssetDetails(token))) {
      result.push({
        base: getAssetDetails(token),
        counter: getAssetDetails(USDC),
      });
    }
  }

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(XLM), getAssetDetails(token))
    && !isSameAsset(getAssetDetails(NLSP), getAssetDetails(token))) {
      result.push({
        base: getAssetDetails(token),
        counter: getAssetDetails(XLM),
      });
    }
  }

  result.push({
    base: getAssetDetails(NLSP),
    counter: getAssetDetails(LSP),
  });

  return result;
}
