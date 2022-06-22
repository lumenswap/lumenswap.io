import StellarSDK from 'stellar-sdk';
import {
  getAssetDetails, isSameAsset, getAssetFromLPAsset, getSingleToken,
} from 'helpers/asset';
import humanizeAmount from './humanizeAmount';
import BN from './BN';

export function lexoOrderAssets(A, B) {
  return (StellarSDK.Asset.compare(A, B) <= 0) ? [A, B] : [B, A];
}

export function getLiquidityPoolIdFromAssets(A, B) {
  const poolParams = new StellarSDK.LiquidityPoolAsset(...lexoOrderAssets(A, B),
    StellarSDK.LiquidityPoolFeeV18);

  return StellarSDK.getLiquidityPoolId(
    'constant_product',
    poolParams.getLiquidityPoolParameters(),
  ).toString('hex');
}

export function lexoOrderTokenWithDetails(A, B) {
  const [sortedA] = lexoOrderAssets(
    getAssetDetails(A),
    getAssetDetails(B),
  );

  if (isSameAsset(sortedA, getAssetDetails(A))) {
    return [A, B];
  }

  return [B, A];
}

export function getTVLInUSD(reserves, xlmPrice, lspPrice, defaultTokens) {
  let balance = '-';
  const tokenA = getAssetFromLPAsset(reserves[0].asset);
  const tokenB = getAssetFromLPAsset(reserves[1].asset);

  if (isSameAsset(tokenA, getAssetDetails(getSingleToken('USDC', defaultTokens)))) {
    balance = humanizeAmount(new BN(reserves[0].amount).times(2).toFixed(7), true);
  }

  if (isSameAsset(tokenB, getAssetDetails(getSingleToken('USDC', defaultTokens)))) {
    balance = humanizeAmount(new BN(reserves[1].amount).times(2).toFixed(7), true);
  }

  if (tokenA.isNative()) {
    balance = humanizeAmount(
      new BN(reserves[0].amount).times(xlmPrice).times(2).toFixed(7),
      true,
    );
  }

  if (tokenB.isNative()) {
    balance = humanizeAmount(
      new BN(reserves[1].amount).times(xlmPrice).times(2).toFixed(7),
      true,
    );
  }

  if (isSameAsset(tokenA, getAssetDetails(getSingleToken('LSP', defaultTokens)))) {
    balance = humanizeAmount(new BN(reserves[0].amount).times(lspPrice).times(2).toFixed(7), true);
  }

  if (isSameAsset(tokenB, getAssetDetails(getSingleToken('LSP', defaultTokens)))) {
    balance = humanizeAmount(new BN(reserves[1].amount).times(lspPrice).times(2).toFixed(7), true);
  }

  return balance;
}
