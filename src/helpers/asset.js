import questionLogo from 'assets/images/question.png';
import StellarSDK from 'stellar-sdk';
import BN from './BN';
import { extractTokenFromCode } from './defaultTokenUtils';
import { getLiquidityPoolIdFromAssets, lexoOrderAssets } from './stellarPool';

export function getAssetDetails(asset) {
  if (asset?.type === 'liquidity_pool_shares') {
    return null;
  }

  if (asset.type === 'native'
    || (asset.code === 'XLM' && asset.issuer === 'native')
    || (asset.code === 'XLM' && asset.issuer === undefined)) {
    return new StellarSDK.Asset.native(); // eslint-disable-line
  }

  if (asset.code && asset.issuer) {
    return new StellarSDK.Asset(asset.code, asset.issuer);
  }

  throw new Error('cannot cast asset');
}

export function isSameAsset(first, second) {
  return first.getCode() === second.getCode()
  && first.getIssuer() === second.getIssuer()
  && first.getAssetType() === second.getAssetType();
}

export function extractLogoByToken(token, defaultTokens) {
  const found = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), getAssetDetails(token)));
  if (found) {
    return found.logo;
  }

  return questionLogo;
}

export function extractInfoByToken(token, defaultTokens) {
  const found = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), getAssetDetails(token)));

  if (found) {
    return {
      web: found.web,
      logo: found.logo,
      isWebIssuer: false,
    };
  }
  return {
    web: token.issuer,
    logo: questionLogo,
    isWebIssuer: true,
  };
}

export function listOfKnownPoolIds(defaultTokens) {
  const poolIds = [];

  {
    const main = getAssetDetails(extractTokenFromCode('XLM', defaultTokens));
    const poolId = getLiquidityPoolIdFromAssets(extractTokenFromCode(extractTokenFromCode('USDC', defaultTokens)), main);
    const [A, B] = lexoOrderAssets(getAssetDetails(extractTokenFromCode('USDC', defaultTokens)), main);

    poolIds.push({
      id: poolId,
      pair: {
        base: A,
        counter: B,
      },
    });
  }

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(token), getAssetDetails(extractTokenFromCode('XLM', defaultTokens)))
    && !isSameAsset(getAssetDetails(token), getAssetDetails(extractTokenFromCode('USDC', defaultTokens)))) {
      const main = getAssetDetails(extractTokenFromCode('XLM', defaultTokens));
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
    if (!isSameAsset(getAssetDetails(token), getAssetDetails(extractTokenFromCode('XLM', defaultTokens)))
    && !isSameAsset(getAssetDetails(token), getAssetDetails(extractTokenFromCode('USDC', defaultTokens)))) {
      const main = getAssetDetails(extractTokenFromCode('USDC', defaultTokens));
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

export function isSamePair(first, second) {
  return isSameAsset(getAssetDetails(first.base), getAssetDetails(second.base))
  && isSameAsset(getAssetDetails(first.counter), getAssetDetails(second.counter));
}

export function pureTokens(list) {
  const seen = {};

  return list.filter((item) => {
    if (seen[`${item.getAssetType()}_${item.getCode()}_${item.getIssuer()}`]) {
      return false;
    }

    seen[`${item.getAssetType()}_${item.getCode()}_${item.getIssuer()}`] = true;
    return true;
  });
}

export function calculateMaxXLM(xlmBalance, subentry) {
  const max = new BN(xlmBalance)
    .minus((2 + subentry) * 0.5)
    .minus(0.005);

  if (max.isLessThan('0')) {
    return '0';
  }

  return max.toString();
}

export function getAssetFromLPAsset(asset) {
  const splitted = asset.split(':');
  return getAssetDetails({
    code: splitted[0],
    issuer: splitted[1],
  });
}
