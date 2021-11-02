import questionLogo from 'assets/images/question.png';
import defaultTokens from 'tokens/defaultTokens';
import getAssetDetails from './getAssetDetails';
import isSameAsset from './isSameAsset';

export function extractLogo(token) {
  const found = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), getAssetDetails(token)));
  if (found) {
    return found.logo;
  }

  return questionLogo;
}
