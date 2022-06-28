import { getAssetDetails, isSameAsset } from 'helpers/asset';
import { extractTokenFromCode } from 'helpers/defaultTokenUtils';

export default function createPairForDefaultTokens(defaultTokens) {
  const result = [];

  for (const token of defaultTokens) {
    if (!token.isHide) {
      if (!isSameAsset(getAssetDetails(extractTokenFromCode('USDC', defaultTokens)), getAssetDetails(token))
      && !isSameAsset(getAssetDetails(extractTokenFromCode('NLSP', defaultTokens)), getAssetDetails(token))) {
        result.push({
          base: getAssetDetails(token),
          counter: getAssetDetails(extractTokenFromCode('USDC', defaultTokens)),
        });
      }
    }
  }

  for (const token of defaultTokens) {
    if (!token.isHide) {
      if (!isSameAsset(getAssetDetails(extractTokenFromCode('XLM', defaultTokens)), getAssetDetails(token))
      && !isSameAsset(getAssetDetails(extractTokenFromCode('NLSP', defaultTokens)), getAssetDetails(token))) {
        result.push({
          base: getAssetDetails(token),
          counter: getAssetDetails(extractTokenFromCode('XLM', defaultTokens)),
        });
      }
    }
  }

  result.push({
    base: getAssetDetails(extractTokenFromCode('NLSP', defaultTokens)),
    counter: getAssetDetails(extractTokenFromCode('LSP', defaultTokens)),
  });

  return result;
}
