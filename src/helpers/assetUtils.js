import questionLogo from 'assets/images/question.png';
import defaultTokens from 'tokens/defaultTokens';
import USDC from 'tokens/USDC';
import XLM from 'tokens/XLM';
import getAssetDetails from './getAssetDetails';
import isSameAsset from './isSameAsset';
import { getLiquidityPoolIdFromAssets, lexoOrderAssets } from './stellarPool';

export function extractLogo(token) {
  const found = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), getAssetDetails(token)));
  if (found) {
    return found.logo;
  }

  return questionLogo;
}

export function listOfKnownPoolIds() {
  const poolIds = [];

  {
    const main = getAssetDetails(XLM);
    const poolId = getLiquidityPoolIdFromAssets(getAssetDetails(USDC), main);
    const [A, B] = lexoOrderAssets(getAssetDetails(USDC), main);

    poolIds.push({
      id: poolId,
      pair: {
        base: A,
        counter: B,
      },
    });
  }

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(token), getAssetDetails(XLM))
    && !isSameAsset(getAssetDetails(token), getAssetDetails(USDC))) {
      const main = getAssetDetails(XLM);
      const poolId = getLiquidityPoolIdFromAssets(getAssetDetails(token), main);
      const [A, B] = lexoOrderAssets(getAssetDetails(token), main);

      poolIds.push({
        id: poolId,
        pair: {
          base: A,
          counter: B,
        },
      });
    }
  }

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(token), getAssetDetails(XLM))
    && !isSameAsset(getAssetDetails(token), getAssetDetails(USDC))) {
      const main = getAssetDetails(USDC);
      const poolId = getLiquidityPoolIdFromAssets(getAssetDetails(token), main);
      const [A, B] = lexoOrderAssets(getAssetDetails(token), main);

      poolIds.push({
        id: poolId,
        pair: {
          base: A,
          counter: B,
        },
      });
    }
  }

  return poolIds;
}
